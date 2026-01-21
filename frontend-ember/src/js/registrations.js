define(['i18n!nls/registrations',
        'i18n!nls/globals',
        'text!templates/registrations.html',
        'text!templates/registration.html',
        'text!templates/registrations-export-modal.html',
        'text!templates/deregistrations-import-modal.html',
        'text!templates/import.html',
        'text!templates/registration-accept-new-owner-modal.html',
        'moment', 'application', 'billers', 'tabular-data-helper', 'jqueryUI', 'modal-dialog', 'strings'],
    function (translations, globalStrings, registrationsTemplate, registrationTemplate,
              registrationsExportModal, deregistrationsImportModal, importTemplate, registrationAcceptNewOwnerModal, moment) {

        var attr = DS.attr;

        var registrationsPageSize = App.payreqConfig.registrations.pageSize;

        var registrationFilters = [App.FilterType.create({
            type: "pendingFailed",
            count: 0,
            requiresFeature: "failed-registrations"
        }),
            App.FilterType.create({
                type: "externalUpdateRequired",
                count: 0,
                requiresFeature: "registrations-external-action-required"
            }),
            App.FilterType.create({type: "registered", count: 0}),
            App.FilterType.create({
                type: "contactChanged",
                count: 0,
                subTab: true,
                requiresFeature: "check-potential-deregistration"
            }),
            App.FilterType.create({type: "deregistered", count: 0}),
            App.FilterType.create({type: "failed", count: 0, requiresFeature: "failed-registrations"}),
            App.FilterType.create({type: "all", count: 0})];

        App.BillerRegistrationsinitRoute = App.BaseBillerRoute.extend(App.FeatureFilterMixin, {
            afterModel: function () {
                var availableFilters = this.filteredByFeature(registrationFilters, this.modelFor("biller"));
                var previouslySelectedType = this.controllerFor("registrations").get("selectedFilters").type;
                var previouslySelectedFilter = registrationFilters.filter(function (filterType) {
                    return filterType.type === previouslySelectedType;
                });
                this.transitionTo("biller.registrations",
                    this.modelFor("biller"),
                    ((previouslySelectedFilter.length > 0) && previouslySelectedFilter[0].get("type")) || availableFilters[0].get("type"));
            }
        });

        App.Registration = DS.Model.extend({
            billerAccountNumber: attr(),
            extPayerName: attr(),
            payerName: attr(),
            payerActorId: attr("number"),
            billerPayerStatus: attr(),
            dateGenerated: attr("date"),
            deactivationDate: attr("date"),
            updatedBy: attr(),
            activationStatus: attr(),
            activationReasonCode: attr(),
            activationProcessStatus: attr(),
            activationProcessSubStatus: attr(),
            deactivationStatus: attr(),
            deactivationProcessSubStatus: attr(),
            deactivationReasonCode: attr(),
            incomingBillsEmailAddress: attr(),
            registrationApprovalCode: attr(),
            channelPartnerSystemId: attr(),
            regIndex: attr(),
            newContactName: attr(),
            contactUpdatedOn: attr("date"),
            contactChanged: attr("boolean"),
            billerPayerId: attr("number"),
            contactExists: attr("boolean"),
            contactId: attr(),
            payerRegistrationDetails: attr(),
            migratedEmail: attr(),
            isFastform: attr("boolean"),
            contactIdIsReused: attr(),
            autoPayment: attr(),
            meta: attr(),
            isDeregistrationReasonRequired: attr("boolean"),

            regStrings: Ember.computed("channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: translations,
                        classifier: this.get("channelPartnerSystemId")
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            status: Ember.computed("activationProcessStatus",
                "activationProcessSubStatus",
                "activationReasonCode",
                "activationStatus",
                "billerPayerStatus",
                "deactivationProcessSubStatus",
                "regStrings", {
                    get: function () {
                        var status = this.get("regStrings.statuses");
                        if (this.get("activationProcessSubStatus") === "failed-auth-awaiting-manual") {
                            return status[this.get("activationProcessSubStatus")];
                        } else if (this.get("activationProcessSubStatus") === "confirmation-required" ||
                            this.get("deactivationProcessSubStatus") === "confirmation-required") {
                            return status["confirmation-required"];
                        } else if (this.get("billerPayerStatus")) {
                            return status[this.get("billerPayerStatus")];
                        } else if (String.isBlank(this.get("activationStatus")) && this.get("activationProcessStatus") === "unprocessed") {
                            return status[this.get("activationProcessStatus")];
                        } else {
                            return status[this.get("activationStatus").toLowerCase()];
                        }
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

            statusDescription: Ember.computed("status", "deactivationDate", "regStrings", {
                get: function () {
                    var statusDescription = this.get("regStrings.statusDescription");
                    if (this.get("deactivationDate")) {
                        return statusDescription[this.get("deactivationReasonCode")];
                    } else if (this.get("billerPayerStatus")) {
                        return statusDescription[this.get("activationReasonCode")];
                    } else {
                        return statusDescription[this.get("activationReasonCode")];
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            registrationApprovalCodeString: Ember.computed("registrationApprovalCode", "regStrings", {
                get: function () {
                    var mapping = this.get("regStrings.registrationApprovalCodeString")
                    return mapping[this.get("registrationApprovalCode")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            deregistrationReason: Ember.computed("deactivationReasonCode", "regStrings", {
                get: function () {
                    return this.get("regStrings.statusDescription")[this.get("deactivationReasonCode")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            deregisteredBy: Ember.computed("updatedBy", {
                get: function () {
                    var updatedBy = this.get("updatedBy");
                    if (!updatedBy || updatedBy.length === 0) {
                        return translations.all.notAvailable;
                    }
                    if (/@payreq\.com\s*$/.test(updatedBy) || updatedBy === "system") {
                        return translations.all.payreqSupport;
                    }
                    return updatedBy;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showBills: Ember.computed("hasBeenActivated", {
                get: function () {
                    return false; // payers bills page deactivated for now
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            channelPartnerSystemDisplay: Ember.computed("channelPartnerSystemId", "migratedEmail", "regStrings", {
                get: function () {
                    var mapping = this.get("regStrings.channels");
                    if (this.get("migratedEmail")) {
                        if (this.get("isFastform")){
                            return this.get("regStrings").fastformEmail;
                        }  else {
                            return this.get("regStrings").manualEmail;
                        }

                    }
                    return mapping[this.get("channelPartnerSystemId")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasBeenActivated: Ember.computed("billerPayerStatus", {
                get: function () {
                    return this.get("billerPayerStatus") != null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasFailedActivation: Ember.computed("activationStatus", {
                get: function () {
                    return this.get("activationStatus") && this.get("activationStatus").toLowerCase() === "inactive";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canBeDeregistered: Ember.computed("hasBeenActivated", "deactivationStatus", {
                get: function () {
                    return this.get("hasBeenActivated") && !this.get("deactivationDate");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasBeenDeregistered: Ember.computed("deactivationReasonCode", {
                get: function () {
                    return this.get("deactivationDate") != null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            accountNumberCouldNotBeFound: Ember.computed("activationReasonCode", {
                get: function () {
                    return this.get("activationReasonCode") == "activation-biller-account-number-not-found";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            requiresReviewForFailedRegistration: Ember.computed("activationProcessSubStatus", {
                get: function () {
                    return this.get("activationProcessSubStatus") == "failed-auth-awaiting-manual"
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            requiresConfirmationOfExternalAction: Ember.computed("activationProcessSubStatus", "deactivationProcessSubStatus", {
                get: function () {
                    return this.get("activationProcessSubStatus") == "confirmation-required" ||
                        this.get("deactivationProcessSubStatus") == "confirmation-required";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasLoadedAuthFields: Ember.computed("authFields", {
                get: function () {
                    return !Ember.isNone(this.get("authFields"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasNotLoadedAuthFields: Ember.computed("hasLoadedAuthFields", {
                get: function () {
                    return !this.get("hasLoadedAuthFields");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            employeeNameClass: Ember.computed("extPayerName", "payerName", {
                get: function () {
                    if (this.get("extPayerName")  !== this.get("payerName")) return "col-md-3 bg-danger";
                    return "col-md-3";
                }
            }),
        });


        App.AuthField = DS.Model.extend({
            fieldName: attr(),
            fieldValue: attr(),
            expectedValue: attr(),

            authFieldClass: Ember.computed("fieldValue", "expectedValue", {
                get: function () {
                    if (this.get("fieldValue")  !== this.get("expectedValue")) return "col-md-3 bg-danger";
                    return "col-md-3";
                }
            }),

            fieldNameReadable: Ember.computed("fieldName", {
                get: function () {
                    return this.get("fieldName").readable();
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasNoFieldValue: Ember.computed("fieldValue", {
                get: function () {
                    return String.isBlank(this.get("fieldValue"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasExpectedValue: Ember.computed("expectedValue", "fieldValue", {
                get: function () {
                    return !String.isBlank(this.get("expectedValue"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            })
        });

        App.RegistrationsExportRouteMixin = Ember.Mixin.create({

            getPreviousExports: function () {
                return Ember.$.get("/data/registrations/exports", {billerId: this.modelFor("biller").id});
            },

            postExport: function (exp) {
                return Ember.$.post("/data/registrations/exports", $.extend({}, {billerId: this.modelFor("biller").id}, exp));
            },

            actions: {
                prepareExportModal: function (onComplete) {
                    this.doRemoteAction(function () {
                            return this.getPreviousExports();
                        },
                        function (results) {
                            this.controller.get("previousExports").clear().addObjects(results.exports);
                            this.controller.set("billerAccountNumberCount", results.billerAccountNumberCount);
                            this.controller.set("contactsCount", results.contactsCount);
                            onComplete();
                        },
                        "An error occurred while retrieving the list of previous exports. Please try again later.");
                },

                sendExportRequest: function (exp, onComplete) {
                    this.doRemoteAction(function () {
                            return this.postExport(exp);
                        },
                        function (results) {
                            onComplete(results.export);
                        },
                        "An error occurred while exporting registrations. Please try again later.");
                }
            }
        });

        App.BillerRegistrationsRoute = App.BaseBillerRoute.extend(
            App.RouteWithRemoteActionsMixin,
            App.RegistrationsExportRouteMixin,
            App.FeatureFilterMixin, {
                controllerName: 'registrations',
                model: function (params) {
                    var searchParms = {billerId: this.modelFor("biller").id, type: params.type, pageNumber: 1};

                    if ("deregistered" == params.type) {
                        searchParms.sortOrder = "deactivationDate";
                        searchParms.sortDirection = "desc";
                    } else if ("contactChanged" == params.type) {
                        searchParms.sortOrder = "contactUpdatedOn";
                        searchParms.sortDirection = "asc";
                    } else {
                        searchParms.sortOrder = "dateGenerated";
                        searchParms.sortDirection = "desc";
                    }

                    if (this.useOldFilters(searchParms.billerId)) {
                        searchParms = $.extend({}, this.controller.allSearchFilters(), searchParms);
                    }
                    return this.execReloadRegistrations(searchParms);
                },

                afterModel: function (model) {
                    if (model.query.type == "pendingFailed" && model.content.length == 0) {
                        this.transitionTo("biller.registrations", this.modelFor("biller"), "registered");
                    }
                },

                useOldFilters: function (billerId) {
                    return this.controller &&
                        (billerId == this.controller.get("selectedFilters.billerId"));
                },

                setupController: function (controller, model) {
                    controller.set("meta", model.get("meta"));
                    this._super(controller, model);

                    var availableFilters = this.filteredByFeature(registrationFilters, this.modelFor("biller"));
                    if (availableFilters.filter(function (typeFilter) {
                        return model.query.type === typeFilter.get("type");
                    }).length == 0) {
                        this.transitionTo("biller.registrations", this.modelFor("biller"), availableFilters[0].get("type"));
                    }

                    var baseFilters = {billerId: this.modelFor("biller").id, type: model.query.type};

                    if ("deregistered" == baseFilters.type) {
                        baseFilters.sortOrder = "deactivationDate";
                        baseFilters.sortDirection = "desc";
                    } else if ("contactChanged" == baseFilters.type) {
                        baseFilters.sortOrder = "contactUpdatedOn";
                        baseFilters.sortDirection = "asc";
                    } else {
                        baseFilters.sortOrder = "dateGenerated";
                        baseFilters.sortDirection = "desc";
                    }

                    if (this.useOldFilters(this.modelFor("biller").id)) {
                        baseFilters = $.extend({}, this.controller.get("selectedFilters"), baseFilters);
                    }
                    controller.setBaseFilters(baseFilters);
                    controller.set("biller", this.modelFor("biller"));
                },

                execReloadRegistrations: function (selectedFilters) {
                    return this.store.query("registration", selectedFilters);
                },

                actions: {
                    reloadData: function (selectedFilters) {
                        this.doRemoteAction(function () {
                                return this.execReloadRegistrations(selectedFilters);
                            },
                            function (results) {
                                this.controller.set("model", results);
                                this.controller.set("meta", results.get("meta"));
                            },
                            "An error occurred while retrieving the list of registrations. Please try again later.");
                    },

                    downloadData: function (url) {
                        this.doRemoteAction(function () {
                                return Ember.$.get(url.fmt(this.modelFor("biller").get("id")));
                            },
                            function (results) {
                                if (results && results.action && results.action == "download") {
                                    window.location.assign(this.controller.get("downloadUrl") + "downloadFileId" + results.downloadFileId);
                                } else if (results && results.action && results.action == "job") {
                                    this.showSuccessMessage("A job with id " + results.jobId + " successfully created for this download. Please go to the job page to get the file.");
                                }
                            },
                            "An error occurred while downloading contacts. Please try again later.");
                    },

                    deregisterImported: function (matchedBillerAccountNumbers, unmatchedBillerAccountNumbers) {
                        this.doRemoteAction(function () {
                                return Ember.$.post("/data/deregistrations/%@/deregister".fmt(this.modelFor("biller").id),
                                    {
                                        billerAccountNumbers: matchedBillerAccountNumbers,
                                        unmatchedBillerAccountNumbers: unmatchedBillerAccountNumbers
                                    });
                            },
                            function (results) {
                                if (results.success) {
                                    this.showSuccessMessage("Successfully deregistered account numbers");
                                } else {
                                    this.showErrorMessage("An error occurred while deregistering the account numbers.");
                                }
                                this.send("reloadData", this.controller.allSearchFilters());
                            },
                            "An error occurred while deregistering the uploaded account numbers. Please try again later.");
                    },

                    importMyBillsRegistrations: function () {
                        this.transitionTo("biller.import");
                    },

                    createSubscription: function () {
                       return window.document.location = "/portal/customer/biller/%@/registrations/admin/create".fmt(this.modelFor("biller").id);
                    },

                    showAndHide: function () {
                        var collapseElement = $("#collapse1");
                        if (collapseElement.hasClass("in")) {
                            this.controller.set("collapse", false);
                        } else {
                            this.controller.set("collapse", true);
                        }
                    },
                }
            });

        var exportDateTimeFormat = "DD MMM YYYY hh:mm:ss a";

        Ember.TEMPLATES['registrations-export-modal'] = Ember.Handlebars.compile(registrationsExportModal);
        App.RegistrationsExportMixin = Ember.Mixin.create({

            exportActionButtons: [App.ModelDialogActionButton.create({
                label: translations.all.cancel,
                actionName: "cancel",
                bsType: "btn-link"
            }),
                App.ModelDialogActionButton.create({
                    label: translations.all.confirmExport,
                    bsType: "btn-primary",
                    actionName: "confirm"
                })],

            exportType: "last-export",
            previousExport: null,
            previousExports: [],
            billerAccountNumberCount: 0,
            contactsCount: 0,

            clear: function () {
                this.set("previousExport", null);
                this.set("exportType", "last-export");
            },

            previousExportOptions: Ember.computed("previousExports.[]", {
                get: function () {
                    return this.get("previousExports").map(function (exp) {
                        return {
                            id: exp.id,
                            originalExport: exp,
                            range: "%@ To %@".fmt(moment(exp.startTime).format(exportDateTimeFormat),
                                moment(exp.endTime).format(exportDateTimeFormat)),
                            endTime: moment(exp.endTime).format(exportDateTimeFormat)
                        };
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canExport: Ember.computed("biller", {
                get: function () {
                    return this.get("biller").hasFeature("registration-export");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),


            isLastExport: Ember.computed("exportType", {
                get: function () {
                    return this.get("exportType") == "last-export";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isFromPreviousExport: Ember.computed("exportType", {
                get: function () {
                    return this.get("exportType") == "from-previous-export";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isPreviousExport: Ember.computed("exportType", {
                get: function () {
                    return this.get("exportType") == "previous-export";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isCurrentSnapshot: Ember.computed("exportType", {
                get: function () {
                    return this.get("exportType") == "current-snapshot";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isFirstExport: Ember.computed("isLastExport", "hasPreviousExports", {
                get: function () {
                    return this.get("isLastExport") && !this.get("hasPreviousExports");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showContactsStats: Ember.computed("contactsCount", {
                get: function () {
                    return this.get("contactsCount") > 0;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            snapshotDataSummary: Ember.computed("billerAccountNumberCount", "strings", {
                get: function () {
                    return this.get("strings.exportModal.currentSnapshotDataSummary").fmt(this.get("billerAccountNumberCount"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            snapshotStats: Ember.computed("contactsCount", "strings", "showContactsStats", {
                get: function () {
                    if (this.get("showContactsStats")) {
                        return this.get("strings.exportModal.currentSnapshotDataStats").fmt(this.get("contactsPercentage"), this.get("contactsCount"));
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            contactsPercentage: Ember.computed("contactsCount", "billerAccountNumberCount", {
                get: function () {
                    var billerAccountNumberCount = this.get("billerAccountNumberCount");
                    var contactsCount = this.get("contactsCount");
                    if (contactsCount > 0) {
                        return parseFloat(Math.round(billerAccountNumberCount / contactsCount * 10000) / 100).toFixed(2);
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            selectedExportSummary: Ember.computed("exportType", "previousExport", "strings", {
                get: function () {
                    var summaryText = this.get("strings.exportModal.selectedSummary.summary");
                    var selectedExport = this.get("previousExport") || {originalExport: {}};
                    if (typeof selectedExport === 'number') {
                        this.get("previousExportOptions").forEach(function (option) {
                            console.log(option);
                            if (option.id === selectedExport) {
                                selectedExport = option;
                            }
                        });
                    }
                    var startTimeFmt = moment(selectedExport.originalExport.startTime).format(exportDateTimeFormat);
                    var endTimeFmt = moment(selectedExport.originalExport.endTime).format(exportDateTimeFormat);
                    var exportTypeText = this.get("strings.exportModal.selectedSummary." + this.get("exportType")).fmt(startTimeFmt, endTimeFmt);
                    return summaryText.fmt(exportTypeText);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            previousExportsDisabled: Ember.computed("isPreviousExport", {
                get: function () {
                    return !this.get("isPreviousExport");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            fromPreviousExportsDisabled: Ember.computed("isFromPreviousExport", {
                get: function () {
                    return !this.get("isFromPreviousExport");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasPreviousExports: Ember.computed("previousExports.[]", {
                get: function () {
                    return !Ember.isNone(this.get("lastExport"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            lastExport: Ember.computed("previousExports.[]", {
                get: function () {
                    return this.get("previousExports").objectAt(0);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                selectExportType: function (exportType) {
                    this.set("exportType", exportType);
                },

                exportRegistrations: function () {
                    this.send("prepareExportModal", $.proxy(function () {
                        this.clear();
                        this.showModal("registrations-export-modal")
                    }, this));
                },

                downloadCsv: function () {
                    var exp = {};

                    if (this.get("isFirstExport")) {
                        exp.firstExport = true;
                    } else if (this.get("isLastExport")) {
                        exp.fromExport = this.get("lastExport.id");
                    } else if (this.get("isFromPreviousExport")) {
                        exp.fromExport = this.get("previousExport");
                    } else if (this.get("isCurrentSnapshot")) {
                        exp.snapshot = true;
                    } else if (this.get("isPreviousExport")) {
                        exp.id = this.get("previousExport");
                    }

                    this.send("sendExportRequest", exp, $.proxy(function (exportToDownload) {
                        document.location.assign(exportToDownload.downloadUrl + "&tz=" + ((new Date).getTimezoneOffset() / 60 * -1));
                    }, this));
                }
            }
        });

        Ember.TEMPLATES['deregistrations-import-modal'] = Ember.Handlebars.compile(deregistrationsImportModal);
        App.DeregistrationsImportMixin = Ember.Mixin.create({
            application: Ember.inject.controller(),
            uploadedInfo: null,
            importActionButtons: [App.ModelDialogActionButton.create({
                label: translations.all.cancel,
                actionName: "cancel",
                bsType: "btn-link"
            }),
                App.ModelDialogActionButton.create({
                    label: translations.all.deregisterConfirm, primary: true,
                    bsType: "btn-primary", actionName: "confirm"
                })],

            deregistrationUploadUrl: Ember.computed({
                get: function () {
                    return "/data/deregistrations/%@/import-file".fmt(this.get("biller").id);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            displayUnmatched: false,

            clear: function () {
                this.set('displayUnmatched', false);
                this.set('uploadedInfo', null);
            },

            canImportDeregistrations: Ember.computed("biller", {
                get: function () {
                    var permissions = this.get("application.permissions");
                    if (permissions) {
                        return permissions.includes("registrations.payers.deregister");
                    }
                    return false;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canCreateRegistrations: Ember.computed("biller", {
                get: function () {
                    var permissions = this.get("application.permissions");
                    if (permissions) {
                        return permissions.includes("contacts.edit.update")
                            && permissions.includes("registrations.failed.approve")
                            && this.getMeta().hasEmail;
                    }
                    return false;
                }
            }),

            isPrimaryDisabled: Ember.computed('uploadedInfo', {
                get: function () {
                    return this.get('uploadedInfo') == null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            uploadSummary: Ember.computed('uploadedInfo', {
                get: function () {
                    return this.get("strings.deregistrationModal.summary").fmt(this.get("uploadedInfo.count"), this.get("uploadedInfo.actual"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                importDeregistrations: function () {
                    this.clear();
                    this.showModal("deregistrations-import-modal");
                },
                doDeregisterImported: function () {
                    if (this.get('uploadedInfo').matched.length > 0 || this.get('uploadedInfo').unmatched.length > 0) {
                        this.send("deregisterImported", this.get('uploadedInfo').matched, this.get('uploadedInfo').unmatched);
                    }
                },
                showUnmatched: function () {
                    this.set('displayUnmatched', true);
                }
            }
        });

        App.RegistrationStringsMixin = Ember.Mixin.create({
            strings: Ember.computed("biller.channelPartnerSystemId", "biller.extBillerId", "biller.masterBiller", {
                get: function () {
                    var extBillerId = null;
                    if (this.get("biller.masterBiller")) {
                        extBillerId = this.get("biller.masterBiller").extBillerId;
                    } else {
                        extBillerId = this.get("biller.extBillerId");
                    }
                    return App.StringsMap.create({
                        baseMap: translations,
                        classifier: this.get("biller.channelPartnerSystemId"),
                        classifier2: this.get("biller.channelPartnerSystemId") + "-" + extBillerId
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            })
        });

        App.RegistrationsDisplayFieldMixin = Ember.Mixin.create({
            displayFields: Ember.computed("biller", {
                get: function () {
                    var biller = this.get("biller");
                    if (biller.get("displayFields")) {
                        return billsDisplayFields = biller.get("displayFields").filter(function (displayField) {
                            return displayField.displayEntityName == "registration";
                        });
                    }
                    return [];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            _showField: function (fieldName) {
                var fields = this.get("displayFields").filter(function (displayField) {
                    return displayField.name == fieldName;
                });
                if (fields && fields.length > 0) {
                    return true;
                }
                return false;
            },
            showBillerAccountNumber: Ember.computed("biller", {
                get: function () {
                    return this._showField("billerAccountNumber");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showPayerName: Ember.computed("biller", {
                get: function () {
                    return this._showField("payerName");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showHasContact: Ember.computed("biller", {
                get: function () {
                    if (this.getMeta().hasQboContacts) {
                        return false;
                    }
                    return this._showField("hasContact");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasMultiChannel: Ember.computed("model", {
                get: function () {
                    return this.getMeta().isMultiChannelBiller;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            requiresContactForApproval: Ember.computed("model", {
                get: function () {
                    return this.getMeta().contactRequiredForRegistationApproval;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showContactId: Ember.computed("biller", {
                get: function () {
                    if (this.get("hasMultiChannel")) {
                        return this._showField("contactId");
                    }
                    return false;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showChannelPartnerSystemId: Ember.computed("biller", {
                get: function () {
                    return this._showField("channelPartnerSystemId");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showExtPayerName: Ember.computed("biller", {
                get: function () {
                    return this._showField("extPayerName");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showIncomingBillsEmailAddress: Ember.computed("biller", {
                get: function () {
                    return this._showField("incomingBillsEmailAddress");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showStatus: Ember.computed("biller", {
                get: function () {
                    return this._showField("status");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showRegistrationApprovalCode: Ember.computed("biller", {
                get: function () {
                    return this._showField("registrationApprovalCode");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showDateGenerated: Ember.computed("biller", {
                get: function () {
                    return this._showField("dateGenerated");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showDeactivationDate: Ember.computed("biller", {
                get: function () {
                    return this._showField("deactivationDate");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showDeregistrationReason: Ember.computed("biller", {
                get: function () {
                    return this._showField("deregistrationReason");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showNewContactName: Ember.computed("biller", {
                get: function () {
                    return this._showField("newContactName");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showContactUpdatedOn: Ember.computed("biller", {
                get: function () {
                    return this._showField("contactUpdatedOn");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            autoPaymentInstalmentDescription: Ember.computed("model", {
                get: function () {
                    return this.get("strings.autoPayment.amountPayable")[this.get("model.autoPayment.amountType")];
                }
            }),

            autoPaymentDayDescription: Ember.computed("model", {
                get: function () {
                    return this.get("strings.autoPayment.paymentDay")[this.get("model.autoPayment.paymentDay")];
                }
            }),

            nextBillAutoPaymentStatusDescription: Ember.computed("model", {
                get: function () {
                    return this.get("strings.autoPayment.status")[this.get("model.autoPayment.nextBill.autoPaymentStatus")];
                }
            }),

        });

        Ember.TEMPLATES['registration-accept-new-owner-modal'] = Ember.Handlebars.compile(registrationAcceptNewOwnerModal);
        App.RegistrationAcceptNewOwnerMixin = Ember.Mixin.create({
            exportActionButtons: [App.ModelDialogActionButton.create({
                label: "Cancel",
                actionName: "cancel",
                bsType: "btn-link"
            }),
                App.ModelDialogActionButton.create({
                    label: "Add Owner & Accept",
                    bsType: "btn-primary",
                    actionName: "confirm",
                    noClose: true,
                    primary: true,
                })],

            reg: null,
            errorMessage: null,
            name: null,

            isPrimaryDisabled: Ember.computed('name', function() {
                return this.get('name') == null;
            }),


            actions:{
                approveNew: function (closeFn) {
                    this.send("acceptNew", this.get("reg"), this.get("name"), closeFn, $.proxy(function (result) {
                        if(result){
                            if(result.contactError) {
                                this.set("errorMessage", "Could not add/update contact for new owner. Please contact Payreq Support.");
                            } else if ((this.controller.get("hasMultiChannel") || this.controller.get("requiresContactForApproval"))
                                && String.isBlank(this.controller.get("contactId"))) {
                                this.set("errorMessage", "Could not approve this registration as matching contact doesn't exist. Please enter a contact and try again.");
                            } else {
                                this.set("errorMessage", "Could not approve this registration. Please try again later.");
                            }
                        }
                    }, this));
                },
            }
        });

        Ember.TEMPLATES['biller/registrations'] = Ember.Handlebars.compile(registrationsTemplate);
        App.RegistrationsController = Ember.Controller.extend(App.TabularDataController,
            App.FeatureFilterMixin,
            App.ModalProducingControllerMixin,
            App.RegistrationsExportMixin,
            App.DeregistrationsImportMixin,
            App.RegistrationStringsMixin,
            App.RegistrationsDisplayFieldMixin, {
                pageSize: registrationsPageSize,
                prepareDownloadUrl: "/data/registrations/%@/download?",
                downloadUrl: "/download/registrations/download?",
                modelName: "registration",
                typeFilters: Ember.computed("biller", "strings", "biller.features.[]", {
                    get: function () {
                        var controller = this;
                        var typeFilters = $.each(this.get("_baseTypeFilters"),
                            function (idx, tf) {
                                tf.set("title", controller.get("strings.capitalised." + tf.get("type")));
                            });
                        return this.filteredByFeature(typeFilters, this.get("biller"));
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                _baseTypeFilters: registrationFilters,

                _baseColumns: Ember.computed("biller", {
                    get: function () {
                        var _baseColumns = [];
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "billerAccountNumber",
                            sortable: true,
                            visible: this.get("showBillerAccountNumber")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "extPayerName",
                            sortable: true,
                            visible: this.get("showExtPayerName")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "payerName",
                            sortable: true,
                            visible: this.get("showPayerName")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "newContactName", sortable: true,
                            hiddenForTypes: ["pendingFailed", "deregistered", "failed", "externalUpdateRequired", "registered", "all"],
                            visible: this.get("showNewContactName")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "contactUpdatedOn", sortable: true,
                            hiddenForTypes: ["pendingFailed", "deregistered", "failed", "externalUpdateRequired", "registered", "all"],
                            visible: this.get("showContactUpdatedOn")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "channelPartnerSystemId",
                            sortable: true,
                            visible: this.get("showChannelPartnerSystemId")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "status",
                            visible: this.get("showStatus")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "contactExists",
                            sortable: true,
                            visible: this.get("showHasContact")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "contactId",
                            sortable: true,
                            visible: this.get("showContactId")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "registrationApprovalCode",
                            sortable: true,
                            requiresFeature: "failed-registrations",
                            hiddenForTypes: ["pendingFailed", "deregistered", "failed", "externalUpdateRequired", "contactChanged"],
                            visible: this.get("showRegistrationApprovalCode")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "dateGenerated",
                            sortable: true,
                            visible: this.get("showDateGenerated")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "deactivationDate", sortable: true,
                            hiddenForTypes: ["pendingFailed", "registered", "failed", "contactChanged"],
                            visible: this.get("showDeactivationDate")
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "emails",
                            sortable: false,
                            visible: false
                        }));
                        _baseColumns.push(App.TableColumn.create({
                            fieldName: "mobiles",
                            sortable: false,
                            visible: false
                        }));
                        return _baseColumns;
                    },

                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                columns: Ember.computed("model", "strings", {
                    get: function () {
                        var controller = this;
                        var columns = $.each(this.get("_baseColumns"),
                            function (idx, c) {
                                c.set("title", controller.get("strings.capitalised." + (c.get("fieldName") || c.get("type"))));
                            });
                        return columns;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                downloadColumns: Ember.computed("model", "strings", function () {
                    var columns = this.get("columns").map(function (a) {
                        return a;
                    });

                    if (this.get("biller").get("channelPartnerSystemId") === "bpv") {
                        var extPayerIdColumn = App.TableColumn.create({
                            fieldName: "extPayerId",
                            sortable: false,
                            visible: true
                        });
                        extPayerIdColumn.set("title", this.get("strings.capitalised.extPayerId"));

                        var accountNumberNoCheckDigit = App.TableColumn.create({
                            fieldName: "accountNumberNoCheckDigit",
                            sortable: false,
                            visible: true,
                        });
                        accountNumberNoCheckDigit.set("title", this.get("strings.capitalised.accountNumberNoCheckDigit"));
                        columns.insertAt(0, extPayerIdColumn);
                        columns.insertAt(2, accountNumberNoCheckDigit);
                    }
                    return columns;
                }),

                getMeta: function () {
                    return this.get("meta");
                },

                defaultDateRange: Ember.computed("model", {
                    get: function () {
                        return this.getMeta().defaultDateRange;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showHelpMessages: Ember.computed("model", {
                    get: function () {
                        return this.getMeta().showHelpMessages;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                epostSubscriptions: Ember.computed("model", {
                    get: function () {
                        return this.get("meta").nextEpostSubscriptions;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                helpMessage: Ember.computed("model", "strings", {
                    get: function () {
                        var controller = this;

                        return controller.get("strings.capitalised.helpMsg." + this.get("selectedFilters.type"));
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),


                hasActionButtons: Ember.computed({
                    get: function () {
                        return this.get("canExport") || this.get("canImportDeregistrations");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),


                showSearch: Ember.computed("model", {
                    get: function () {
                        var search = this.get("collapse");
                        if (typeof search == 'undefined') {
                            return false;
                        }
                        return search;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                hasMyBillsAgent: Ember.computed("model", {
                    get: function () {
                        var permissions = this.get("application.permissions");
                        if (permissions) {
                            return permissions.includes("registrations.failed.approve")
                                && this.getMeta().hasMybillsAgent
                                && this.getMeta().hasActiveAuthorisation;
                        }
                        return false;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                globalStrings: globalStrings,


            });

        Ember.TEMPLATES['confirm-delete-email'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Delete Email\" actionButtons=deleteEmailConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"deleteEmailAction\"}}" +
            "Are you sure you want to delete the registered email <strong>{{details.registrationValue}}</strong>?" +
            "{{/modal-dialog}}");


        App.BillerRegistrationRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function (params) {
                return this._getRegistration(params.registrationId);
            },

            _getRegistration: function (id) {
                return this.store.findRecord("registration", id, {reload: true});
            },

            setupController: function (controller, model) {
                model.set("authFields", null);

                this._super(controller, model);
                controller.set("biller", this.modelFor("biller"));
                controller.set('model', model);

                var totalRecords = 1;

                if (this.controllerFor("biller.registrations").getMeta()) {
                    totalRecords = this.controllerFor("biller.registrations").getMeta().total;
                }

                var currentIndex = model.get("regIndex");
                if (typeof currentIndex !== "undefined") {
                    controller.set("showPreviousNextButtons", true);
                    if (totalRecords == (currentIndex + 1)) {
                        controller.set("disableNext", true);
                    } else {
                        controller.set("disableNext", false);
                    }
                    if (currentIndex == 0) {
                        controller.set("disablePrevious", true);
                    } else {
                        controller.set("disablePrevious", false);
                    }
                } else {
                    controller.set("showPreviousNextButtons", false);
                    controller.set("disableNext", true);
                    controller.set("disablePrevious", true);
                }
            },

            _handleGoToNextAutomatically: function (reg, goToNext, successMessage) {
                var isLast = this.controller.get("disableNext");
                if (goToNext && !isLast) {
                    var billerRegistrationsController = this.controllerFor("biller.registrations");
                    var selectedFilters = billerRegistrationsController.allSearchFilters();
                    var pageNumber = 0;
                    if (billerRegistrationsController.getMeta()) {
                        pageNumber = billerRegistrationsController.getMeta().pageNumber;
                    }

                    if (pageNumber == 0) {
                        pageNumber = 1;
                    }
                    var pageSize = billerRegistrationsController.get("pageSize");
                    this.doRemoteAction(function () {
                            return this.store.query("registration", $.extend({}, selectedFilters, {pageNumber: pageNumber}));
                        },
                        function (results) {
                            this.controllerFor("biller.registrations").set("model", results);
                            this.controllerFor("biller.registrations").set("meta", results.get("meta"));
                            var regIndex = reg.get("regIndex");
                            var newReg = this.controllerFor("biller.registrations").get("model").findBy('regIndex', regIndex);
                            if (newReg && (newReg.get("id") == reg.get("id"))) {
                                this.send("moveByIndex", reg, 1, true);
                            } else if (newReg) {
                                this.send("moveTo", newReg, true);
                            } else {
                                this.controller.set("disableNext", true);
                                this.send("refresh", reg, false, true);
                                this.showSuccessMessage(successMessage);
                            }
                        },
                        "Could not load the next registration. Please try again later.");
                } else {
                    this.send("refresh", reg, false, true);
                    this.showSuccessMessage(successMessage);
                }
            },

            actions: {
                refresh: function (reg, moveToNext, loadAuthField) {
                    this.store.unloadRecord(reg);
                    var regIndex = reg.get("regIndex");
                    this.doRemoteAction(function () {
                            return this._getRegistration(reg.id);
                        },
                        function (results) {
                            Ember.set(results, "regIndex", regIndex);
                            this.controller.set("model", results);
                            this.controller.set("biller", this.modelFor("biller"));
                            if (moveToNext) {
                                this.send("moveByIndex", reg, 1, loadAuthField);
                            }
                        },
                        "Could not refresh payer registration details. Please try again later.");
                },

                moveTo: function (reg, loadAuthField) {
                    var totalRecords = this.controller.getMeta().total;

                    var currentIndex = reg.get("regIndex");
                    if (typeof currentIndex !== "undefined") {
                        if (totalRecords == (currentIndex + 1)) {
                            this.controller.set("disableNext", true);
                        } else {
                            this.controller.set("disableNext", false);
                        }
                        if (currentIndex == 0) {
                            this.controller.set("disablePrevious", true);
                        } else {
                            this.controller.set("disablePrevious", false);
                        }
                    } else {
                        this.controller.set("disableNext", true);
                        this.controller.set("disablePrevious", true);
                    }

                    this.transitionTo('biller.registration', reg.id);

                    if (loadAuthField) {
                        this.send("getAuthField", reg);
                    }
                },

                moveByIndex: function (reg, delta, loadAuthField) {
                    var nextIndex = (reg.get("regIndex") + delta);

                    var billerRegistrationsController = this.controllerFor("biller.registrations");
                    var selectedFilters = this.controllerFor("biller.registrations").allSearchFilters();

                    var records = billerRegistrationsController.get("model");

                    var nextReg = null;
                    if (records) {
                        nextReg = records.findBy("regIndex", nextIndex)
                    }
                    ;

                    if (nextReg) {
                        this.send("moveTo", nextReg, loadAuthField);
                    } else {
                        var currentPageNumber = 0;
                        if (billerRegistrationsController.getMeta()) {
                            currentPageNumber = billerRegistrationsController.getMeta().pageNumber;
                        }
                        if (currentPageNumber == 0) {
                            currentPageNumber = 1;
                        }
                        var pageSize = billerRegistrationsController.get("pageSize");
                        var pageNumber = currentPageNumber + delta;
                        this.doRemoteAction(function () {
                                return this.store.query("registration", $.extend({}, selectedFilters, {pageNumber: pageNumber}));
                            },
                            function (results) {
                                if (results && results.content && results.content.length > 0) {
                                    this.controllerFor("biller.registrations").set("model", results);
                                    this.controllerFor("biller.registrations").set("meta", results.get("meta"));
                                    this.send("moveByIndex", reg, delta, loadAuthField);
                                }
                            },
                            "Could not load the next registration. Please try again later.");
                    }
                },

                getAuthField: function (reg) {
                    this.doRemoteAction(function () {
                            return this.store.query("authField", {activationId: reg.id});
                        },
                        function (results) {
                            this.controller.get("model").set("authFields", results);
                        },
                        "Could not fetch authentication fields for this registration. Please try again later.");
                },

                deregister: function (reg, reason) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/deregister".fmt(reg.id), {reason: reason});
                        },
                        function () {
                            if (reg.get("contactChanged")) {
                                this._handleGoToNextAutomatically(reg, this.controller.get("goToNextContactChanged"), "Payer has been successfully deregistered.");
                            } else {
                                this.send("refresh", reg);
                                this.showSuccessMessage("Payer has been successfully deregistered.");
                                this.controller.set("disableNext", true);
                                this.controller.set("disablePrevious", true);
                            }
                        },
                        "Could not deregister this payer. Please try again later.");
                },

                acceptContactChange: function (reg) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/acceptContactChange".fmt(reg.get("billerPayerId")));
                        },
                        function () {
                            this._handleGoToNextAutomatically(reg, this.controller.get("goToNextContactChanged"), "Contact change has been successfully updated for payer.");
                        },
                        "Could not accept the contact change for this payer. Please try again later.");
                },

                approve: function (reg) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/approve".fmt(reg.id));

                        },
                        function () {
                            this._handleGoToNextAutomatically(reg, this.controller.get("goToNext"), "Successfully approved registration.");
                        },
                        function (results) {
                            if ((this.controller.get("hasMultiChannel") || this.controller.get("requiresContactForApproval"))
                                && String.isBlank(this.controller.get("contactId"))) {
                                this.showErrorMessage("Could not approve this registration as matching contact doesn't exist. Please enter a contact and try again.");
                            } else {
                                this.showErrorMessage("Could not approve this registration. Please try again later.");
                            }
                        });
                },

                reject: function (reg, reason) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/reject".fmt(reg.id), {reason: reason});
                        },
                        function () {
                            this._handleGoToNextAutomatically(reg, this.controller.get("goToNext"), "Successfully rejected registration.");
                        },
                        "Could not reject this registration. Please try again later.");
                },

                confirmExternalAction: function (reg) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/confirmExternalAction".fmt(reg.id));
                        },
                        function () {
                            this.send("refresh", reg);
                            this.showSuccessMessage("Registration has been confirmed.");
                        },
                        "Could not confirm registration. Please try again later.");
                },

                deleteEmail: function (detail, reg) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/details/delete/%@".fmt(detail.id));
                        },
                        function (response) {
                            this.send("refresh", reg);
                            if (response.success) {
                                this.showSuccessMessage("Email Registration has been deleted.");
                            } else {
                                this.showErrorMessage("An error was encountered while deleting the email registration. Please try again later.")
                            }
                        },
                        "Could not confirm registration. Please try again later.");
                },

                showDeleteError: function () {
                    this.showErrorMessage("The selected email cannot be deleted. At least one active email is required for a registration.")
                },

                acceptNew: function(reg, name, closeFn, onComplete) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/registrations/%@/approve-new".fmt(reg.id), {customerName: name});

                        },
                        function (results) {
                            if(results.success){
                                closeFn();
                                this._handleGoToNextAutomatically(reg, this.controller.get("goToNextContactChanged"), "Payer has been successfully registered.");
                            }  else {
                                onComplete(results);
                            }
                        },
                        "Unable to accept registration please contact Payreq Support");
                }
            }
        });

        Ember.TEMPLATES['biller/registration'] = Ember.Handlebars.compile(registrationTemplate);
        App.BillerRegistrationController = Ember.Controller.extend(App.RegistrationStringsMixin,
            App.RegistrationAcceptNewOwnerMixin,
            App.RegistrationsDisplayFieldMixin,
            App.ModalProducingControllerMixin, {
                application: Ember.inject.controller(),
                registrations: Ember.inject.controller(),
                disableNext: false,
                disablePrevious: false,
                showPreviousNextButtons: false,
                goToNext: true,
                goToNextContactChanged: true,

                deleteEmailConfirmActionButtons: [App.ModelDialogActionButton.create({
                    label: "Cancel",
                    actionName: "cancel"
                }),
                    App.ModelDialogActionButton.create({label: "Delete", bsType: "btn-danger", actionName: "confirm"})],

                getMeta: function () {
                    return this.get("model.meta");
                },

                canViewAuthFields: Ember.computed("application.entityContext", {
                    get: function () {
                        if (this.get("application.entityContext")) {
                            var permissions = this.get("application.permissions");
                            return (permissions.includes("registrations.failed.approve") ||
                                permissions.includes("registrations.failed.reject"));
                        } else {
                            return false;
                        }
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                isRegistrationEditor: Ember.computed("application.permissions", {
                    get: function () {
                        var permissions = this.get("application.permissions");
                        if (permissions) {
                            return permissions.includes("registrations.payers.deregister");
                        }
                        return false;
                    }
                }),

                canDeregister: Ember.computed("model.canBeDeregistered", "application.entityContext", {
                    get: function () {
                        if (!this.get("model.canBeDeregistered")) return false;

                        if (this.get("application.entityContext")) {
                            var permissions = this.get("application.permissions");
                            return (permissions.includes("registrations.payers.deregister"));
                        } else {
                            return false;
                        }
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showExtraDeregisterReasons: Ember.computed("model.channelPartnerSystemId", {
                    get: function () {
                        return this.get("model.channelPartnerSystemId") !== "bpv";
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showDestinationEmailAddress: Ember.computed("model.canBeDeregistered", "biller", {
                    get: function () {
                        //if a payer can be deregistered, it implies it is active and can receive incoming bills, and has not already been deactivated
                        return this.get("model.canBeDeregistered") &&
                            this.get("biller").hasFeature("bill-emailed");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                confirmationText: Ember.computed("model.hasBeenDeregistered", "model.hasBeenActivated", "strings", {
                    get: function () {
                        if (this.get("hasBeenDeregistered")) {
                            return this.get("strings.externalConfirmation.deactivated");
                        } else if (this.get("hasBeenActivated")) {
                            return this.get("strings.externalConfirmation.activated")
                        } else return null;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                isMyPay: Ember.computed("biller", {
                    get: function () {
                        return this.get("biller.channelPartnerSystemId") === "epost";
                    }
                }),

                isMyPayDelivery: Ember.computed("model",{
                    get: function (){
                        return this.get("model.channelPartnerSystemId") === "mybills" || this.get("model.channelPartnerSystemId") === "mybills-bills";
                    }
                }),

                actions: {
                    removeEmail: function (detail) {
                        var activeEmailsCount = 0;
                        if (typeof detail.status !== "undefined" && detail.status == 0) {
                            $.each(this.get("model.payerRegistrationDetails"),
                                function (idx, tf) {
                                    if (tf.status == 0) {
                                        activeEmailsCount += 1;
                                    }
                                    ;
                                });
                        }

                        if (activeEmailsCount != 1) {
                            this.set("detail", detail);
                            this.showModal("confirm-delete-email");
                        } else {
                            this.send("showDeleteError");
                        }

                    },
                    deleteEmailAction: function () {
                        this.send("deleteEmail", this.get("detail"), this.get("model"));
                    },

                    acceptNewOwner: function (reg) {
                        this.set("reg", reg);
                        this.set("name", null);
                        this.set("errorMessage", null);
                        this.showModal("registration-accept-new-owner-modal");
                    },
                }

            });

        App.BillerImportRoute = App.BaseBillerRoute.extend(
            App.RouteWithRemoteActionsMixin, App.LoadingAlertRouteMixin, {
                model: function (params) {
                    this.modelFor("biller").set("currentMailer", this.modelFor("biller").get("id"));
                    return Ember.$.get("/data/payer/registrations/%@/mailer/%@/channels/selfservice/mybillsagent".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("id")));
                },


                setupController: function (controller, model) {
                    this._super(controller, model);
                    controller.set("registrationField", model.previousFields.registrationField);
                    controller.set("authfield1", model.previousFields.authField1);
                    controller.set("authfield2", model.previousFields.authField2);
                    controller.set("authfield3", model.previousFields.authField3);
                    controller.set("authfield4", model.previousFields.authField4);
                    controller.set("currentRegistrationNo", 2);
                    controller.set("bulkregocreated", false);
                    controller.set("hasImportedRegistrations", false);
                    controller.set("authorisedAgent", model.authorisations[0].id);
                    if (this.modelFor("biller").get("currentAuthorisation")) {
                        controller.set("authorisedAgent", this.modelFor("biller").get("currentAuthorisation"));
                    }

                    if (model.importedRegistrationsComplete) {
                        var importedRegistrations = model.importedRegistrationsAdd;
                        if (importedRegistrations.length > 0) {
                            for (var i = 0; i < importedRegistrations.length; i++) {
                                importedRegistrations[i].regNo = i + 1;
                            }
                            controller.set("registrations", importedRegistrations);
                        } else {
                            controller.set("registrations", []);
                            controller.get("registrations").pushObject({"regNo": 1, "accountNumber": null});
                        }
                        controller.set("hasImportedRegistrations", true);
                        controller.set("currentRegistrationNo", importedRegistrations.length + 1);
                        controller.set("importedRegistrationCount", importedRegistrations.length);
                        controller.set("registrationsToCreate", importedRegistrations.length == 0);
                        controller.set("importedErrorCount", model.importedRegistrationsError.length);
                        controller.set("importedExistsCount", model.importedRegistrationsExistsCount);
                    } else {
                        controller.set("registrations", []);
                        controller.get("registrations").pushObject({"regNo": 1, "accountNumber": null});
                    }
                    controller.set("mailerId", this.modelFor("biller").get("currentMailer"));

                    controller.set("errormessage", null);
                    controller.set("accept", false);
                    controller.set("biller", this.modelFor("biller"));
                    controller.set("model", model);
                },


                actions: {
                    saveRegistration: function (registrations) {
                        this.startLoading();
                        var authorisations = this.controller.get("model").authorisations;
                        var authorisedAgent = this.controller.get("authorisedAgent");
                        var authorisationName = "";
                        authorisations.forEach(function (entry) {
                            if (authorisedAgent === entry.id) {
                                authorisationName = entry.name;
                            }
                        });
                        this.controller.set("authorisationName", authorisationName);

                        var bulkRegistrations = {bulkregistrations: registrations, accept: true, isBiller: true};

                        Ember.$.post("/data/payer/registrations/%@/mailer/%@/channels/selfservice/bulk/mybillsagent".fmt(this.controller.get("authorisedAgent"), this.modelFor("biller").get("id")),
                            bulkRegistrations)
                            .always($.proxy(this.finishedLoading, this))
                            .done($.proxy(function (response) {
                                this.controller.set("errorsemail", null);
                                this.controller.set("model.updateerror", null);
                                if (response.success) {
                                    this.showSuccessMessage("MyBills Agent Registrations Created.");
                                    this.controller.set("bulkregocreated", true);
                                    this.controller.set("registrationsCreated", response.registrationsCreated);
                                    this.controller.set("registrationsCreatedCount", response.registrationsCreated.length);
                                    this.controller.set("registrationsExisting", response.registrationsExisting);
                                    this.controller.set("registrationsExistingCount", response.registrationsExisting.length);
                                    this.controller.set("registrationsCount", response.registrationsExisting.length + response.registrationsCreated.length);
                                } else {
                                    this.controller.set("errormessage", response.errorMessage);

                                    if (response.errorMessage) {
                                        this.showErrorMessage("We are unable to save your registration due to validation errors. Please see top of the page for error details.");
                                    } else if (response.errorMessageTwo) {
                                        this.controller.set("errormessage", response.errorMessageTwo);
                                        this.showErrorMessage(response.errorMessageTwo);
                                    } else if (response.message.length > 0 && response.accept) {
                                        this.controller.set("errorsemail", response.message);
                                        this.controller.set("model.updateerror", "Please correct the invalid MyBills Agent registrations below:");
                                        this.errorOnField("#accept", "Please accept terms and conditions");
                                        this.showErrorMessage("The registrations could not be saved due to an validation errors. Please see error message above Registrations.");
                                    } else if (response.accept) {
                                        this.errorOnField("#accept", "Please accept terms and conditions");
                                        this.showErrorMessage("The registrations could not be saved due to an validation errors. Please see error message above Registrations.");
                                    } else {
                                        this.showErrorMessage("We are unable to save your registration. Please try again later.");
                                    }

                                }
                            }, this));


                    },

                    importRegistrations: function () {
                        this.modelFor("biller").set("currentAuthorisation", this.controller.get("authorisedAgent"));
                        this.transitionTo("biller.incoming.importfromtext", this.controller.get("mailerId"));

                    },

                    addMyBillsAgentRegistration: function () {
                        this.controller.set("model.updateerror", null);
                        var currentRegNo = this.controller.get("currentRegistrationNo");
                        this.controller.get("registrations").pushObject({"regNo": currentRegNo, "accountNumber": null});
                        currentRegNo = currentRegNo + 1;
                        this.controller.set("currentRegistrationNo", currentRegNo);

                    },

                    removeMyBillsAgentRegistration: function (detail) {
                        //Add modal
                        this.controller.set("model.updateerror", null);
                        if (this.controller.get("registrations").length == 1) {
                            //if the email is the last one don't allow it to be deleted!
                            this.controller.set("model.updateerror", "The selected registration cannot be deleted. At least one MyBills Agent registration is required.");
                        } else {
                            this.controller.get("registrations").removeObject(detail);
                        }
                    },

                }
            });

        Ember.TEMPLATES['biller/import'] = Ember.Handlebars.compile(importTemplate);
        App.BillerImportController = Ember.Controller.extend({
            hasAuthField1: Ember.computed("model", {
                get: function () {
                    return this.get('model.channel.authItem1Field');
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
        });


    });
