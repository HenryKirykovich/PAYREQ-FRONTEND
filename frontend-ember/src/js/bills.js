define(['i18n!nls/bills',
        'i18n!nls/billSettings',
        'i18n!nls/globals',
        'text!templates/bills.html',
        'text!templates/bill.html',
        'text!templates/bill-upload-modal.html',
        'text!templates/download-payment-files-modal.html',
        'text!templates/external-action-modal.html',
        'text!templates/bill-download-modal.html',
        'moment', 'currency', 'application', 'emberdata', 'billers', 'tabular-data-helper', 'document-viewer',
        'modal-dialog', 'jqueryFileUpload', 'multi-file-upload-component', 'strings', 'form-helper', 'selectize'
    ],
    function (billTranslations, billSettingsTranslations, globalStrings, billsTemplate, billTemplate, billUploadModal,
              downloadPaymentFilesModal, externalActionModal, billDownloadModal, moment, currency) {

        var attr = DS.attr;
        var billsPageSize = App.payreqConfig.bills.pageSize;

        App.BillerBillsinitRoute = App.BaseBillerRoute.extend({
            afterModel: function () {
                var previouslySelectedType = this.controllerFor("bills").get("selectedFilters.type");
                var billStatus = this.modelFor("biller").get("meta").defaultBillStatus.split(",");
                this.transitionTo("biller.bills", this.modelFor("biller"), previouslySelectedType || billStatus[0]);
            }
        });

        App.Bill = DS.Model.extend({
            billerInvoiceNumber: attr(),
            billerAccountNumber: attr(),
            extRefNumber: attr(),
            billRef1: attr(),
            billRef2: attr(),
            billRef3: attr(),
            billRef4: attr(),
            billRef5: attr(),
            billRef6: attr(),
            meta: attr(),
            dueDate: attr("date"),
            receivedTime: attr("date"),
            createdTime: attr("date"),
            firstActionedTime: attr("date"),
            status: attr(),
            billType: attr(),
            amountDue: attr("number"),
            minAmountDue: attr("number"),
            accountBalance: attr("number"),
            prevAccountBalance: attr("number"),
            payerName: attr(),
            documentHref: attr(),
            documentId: attr(),
            numPayersSentTo: attr("number"),
            numPayersFailed: attr("number"),
            validationFailures: attr(),
            channelPartnerSystemId: attr(),
            actioned: attr("boolean"),
            actionedOn: attr("date"),
            actionDescription: attr(),
            jobId: attr(),
            billTransaction: attr(),
            hasChargingModel: attr("boolean"),
            emailLogs: attr(),
            invoice: attr(),
            sendToPrinter: attr("boolean"),
            sentTime: attr("boolean"),
            documentPages: attr("number"),
            currency: attr(""),
            autoPaymentStatus: attr(),
            reviewedBy: attr(),
            reviewedTime: attr("date"),
            emailDeliveryDetails: attr(),
            dueDateTotal: attr("date"),
            billerActorId: attr("number"),
            customerReference: attr(),

            billPayers: DS.hasMany("billPayer", {
                async: true
            }),

            billAccounting: DS.belongsTo("billAccounting", {
                async: true
            }),

            billViewLogs: DS.hasMany("billViewLog", {
                async: true
            }),

            billStrings: Ember.computed("channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: billTranslations,
                        classifier: this.get("channelPartnerSystemId")
                    });
                }
            }),

            billSettingsStrings: Ember.computed("channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: billSettingsTranslations,
                        classifier: this.get("channelPartnerSystemId")
                    });
                }
            }),

            statusText: Ember.computed("status", "billStrings", {
                get: function () {
                    return this.get("billStrings.capitalised.statusLabel")[this.get("status")];
                }
            }),

            statusDescription: Ember.computed("status", "billStrings", {
                get: function () {
                    return this.get("billStrings.capitalised.statusDescription")[this.get("status")];
                }
            }),

            billTypeDescription: Ember.computed("billType", "billStrings", {
                get: function () {
                    return this.get("billStrings.billTypes")[this.get("billType")];
                }
            }),

            amountAsCurrency: Ember.computed("amountDue", "currency", {
                get: function () {
                    return currency.toCurrency(this.get("currency"), this.get("amountDue"));
                }
            }),

            schemeLabel: Ember.computed("invoice", {
                get: function () {
                    return {
                        visa: "Visa",
                        mastercard: "Mastercard",
                        amex: "American Express",
                        diners: "Diners Club International",
                        japcb: "Japanese Credit Bureau",
                        laser: "Laser Deposits",
                        solo: "Solo"
                    }[this.get('invoice').scheme];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            paidAmountAsCurrency: Ember.computed("invoice", "currency", {
                get: function () {
                    return currency.toCurrency(this.get("currency"), this.get("invoice").totalInclSurcharge);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            minAmountDueSupplied: Ember.computed("minAmountDue", {
                get: function () {
                    return this.get("minAmountDue") !== null;
                }
            }),

            minAmountAsCurrency: Ember.computed("minAmountDue", "currency", {
                get: function () {
                    return currency.toCurrency(this.get("currency"), this.get("minAmountDue"));
                }
            }),

            accountBalanceAsCurrency: Ember.computed("accountBalance", {
                get: function () {
                    return currency.toCurrency(this.get("currency"), this.get("accountBalance"));
                }
            }),

            prevAccountBalanceAsCurrency: Ember.computed("prevAccountBalance", {
                get: function () {
                    return currency.toCurrency(this.get("currency"), this.get("prevAccountBalance"));
                }
            }),

            waitingCredit: Ember.computed("status", {
                get: function () {
                    return this.get("status") == "ready-for-dispatch-awaiting-credit";
                }
            }),

            inDraft: Ember.computed("status", {
                get: function () {
                    return this.get("status") === "draft" || this.get("status") === "ignored";
                }
            }),

            isPendingRegistration: Ember.computed("status", {
                get: function () {
                    return this.get("status") == "pending-registration";
                }
            }),

            hasValidationFailures: Ember.computed("validationFailures", "validationFailures.[]", {
                get: function () {
                    return this.get("validationFailures") ? this.get("validationFailures").length > 0 : false;
                }
            }),

            waitingReview: Ember.computed("status", {
                get: function () {
                    return this.get("status") == "review-by-biller";
                }
            }),

            contactChanged: Ember.computed("status", {
                get: function () {
                    return this.get("status") == "contact-changed";
                }
            }),

            hasUndeliverables: Ember.computed("numPayersFailed", {
                get: function () {
                    return this.get("numPayersFailed") > 0;
                }
            }),

            hasBeenRejected: Ember.computed({
                get: function () {
                    return this.get("status") == "rejected";
                }
            }),

            hasBeenQueued: Ember.computed("status", {
                get: function () {
                    return "readyForDispatch" === this.get("status");
                }
            }),

            hasBeenSent: Ember.computed("status", {
                get: function () {
                    return "dispatched" === this.get("status") || "undelivered" === this.get("status");
                }
            }),

            hasNotBeenRejected: Ember.computed("hasBeenRejected", {
                get: function () {
                    return !this.get("hasBeenRejected");
                }
            }),

            validationFailuresWithDescriptions: Ember.computed("validationFailures", "validationFailures.[]", {
                get: function () {
                    var bill = this;
                    return (this.get("validationFailures") || []).map(function (failure) {
                        var fieldName = bill.get("billSettingsStrings.billField.fieldName")[failure.field];
                        return $.extend({},
                            failure, {
                                description: bill.get("billStrings.validationFailure")[failure.reason].fmt(fieldName)
                            });
                    });
                }
            }),

            isStatusOfNote: Ember.computed("hasBeenRejected", "hasBeenQueued", "hasBeenSent", "waitingCredit", "waitingReview", "inDraft", "isPendingRegistration", {
                get: function () {
                    return this.get("hasBeenRejected") ||
                        this.get("hasBeenQueued") ||
                        this.get("hasBeenSent") ||
                        this.get("waitingCredit") ||
                        this.get("waitingReview") ||
                        this.get("inDraft") ||
                        this.get("isPendingRegistration");
                }
            }),

            formattedDueDate: Ember.computed("dueDate", {
                get: function () {
                    return moment(this.get('dueDate')).format("DD MMM YYYY");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            formattedDueDateTotal: Ember.computed("dueDateTotal", {
                get: function () {
                    return moment(this.get('dueDate')).format("DD MMM YYYY");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            dueDateUtc: Ember.computed("dueDate", {
                get: function () {
                    if (this.get('dueDate')) {
                        return moment.utc(this.get('dueDate').toISOString())
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            dueDateTotalUtc: Ember.computed("dueDateTotal", {
                get: function () {
                    if (this.get('dueDateTotal')) {
                        return moment.utc(this.get('dueDateTotal').toISOString());
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
        });

        App.BillPayer = DS.Model.extend({
            nonDeliveredReasonCode: attr(),
            nonDeliveredTime: attr("date"),
            actionedTime: attr("date"),
            payerActorId: attr("number"),
            dispatchTime: attr("date"),
            creationDate: attr("date"), //the payer registered date - a bit misleading...
            tagName: attr(),
            dispatchType: attr(),

            bill: DS.belongsTo("bill", {async: true}),

            wasNonDelivered: Ember.computed("nonDeliveredTime", {
                get: function () {
                    return this.get("nonDeliveredTime");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            wasDelivered: Ember.computed("actionedTime", {
                get: function () {
                    return this.get("actionedTime");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            dispatchTypeDisplay: Ember.computed("strings", "dispatchType", {
                get: function () {
                    return this.get("bill.billStrings.capitalised.channels")[this.get("dispatchType")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            nonDeliveredReason: Ember.computed("nonDeliveredReasonCode", "bill", {
                get: function () {
                    return this.get("bill.billStrings.capitalised.billPayer.nonDeliveredReason")[this.get("nonDeliveredReasonCode")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            })
        });

        App.BillAccounting = DS.Model.extend({
            documentSize: attr(),
            requiredCredits: attr(),
            accountingPlan: attr(),
            creditBalance: attr("number"),

            bill: DS.belongsTo("bill")
        });

        App.BillViewLog = DS.Model.extend({
            payerName: attr(),
            viewedOn: attr("date"),

            bill: DS.belongsTo("bill")
        });

        App.BillFormat = DS.Model.extend({
            id: attr(),
            displayName: attr(),
            typeName: attr(),
            credits: attr(),
            readBillerAccountNumberFromContact: attr(),
            indicator: attr(),
            splitEndFile: attr("boolean"),
            forceIgnoreContacts: attr("boolean"),
            idString:  Ember.computed("id", {
                get: function () {
                    return this.get("id").toString();
                }
            })

        });

        App.BillsStringsMixin = Ember.Mixin.create({
            strings: Ember.computed("biller.channelPartnerSystemId", {
                get: function () {
                    return App.StringsMap.create({
                        baseMap: billTranslations,
                        classifier: this.get("biller.channelPartnerSystemId")
                    });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            })
        });

        App.BillUploadRouteMixin = Ember.Mixin.create({
            fetchBillFormats: function () {
                return this.store.query("billFormat", {
                    billerId: this.modelFor("biller").get("id")
                });
            },

            actions: {
                prepareUploadModal: function (onComplete) {
                    this.doRemoteAction(function () {
                            return this.fetchBillFormats();
                        },
                        function (results) {
                            onComplete(results);
                        },
                        "An error occurred while fetching the available mail upload formats. Please try again later.");
                }
            }
        });

        Ember.TEMPLATES['bill-download-modal'] = Ember.Handlebars.compile(billDownloadModal);
        App.BillDownloadModalMixin = Ember.Mixin.create({
            application: Ember.inject.controller(),
            selectedFormat: "download_csv",
            firstPageOnly: false,
            notifyOnCompletion: true,

            count: Ember.computed('controller.model', {
                get: function () {
                    return this.get("controller.model.meta.total");
                }
            }),

            downloadActionButtons: [
                App.ModelDialogActionButton.create({label: "Cancel", actionName: "cancel", bsType: "btn-link"}),
                App.ModelDialogActionButton.create({
                    label: "Download",
                    primary: true,
                    bsType: "btn-primary",
                    actionName: "confirm"
                })
            ],

            modalTitle: Ember.computed('format', 'controller.model', {
                get: function () {
                    return this.get("controller.strings.downloadModalTitle").fmt(this.get("count"));
                }
            }),

            isPrimaryDisabled: Ember.computed('format', {
                get: function () {
                    return false;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isCSV: Ember.computed('selectedFormat', {
                get: function () {
                    return this.get("selectedFormat") === "download_csv"
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isMerged: Ember.computed('selectedFormat', {
                get: function () {
                    return this.get("selectedFormat") === "download_one"
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isSingles: Ember.computed('selectedFormat', {
                get: function () {
                    return this.get("selectedFormat") === "download_bills"
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isDownloadFirstPage: Ember.computed('firstPageOnly', {
                get: function () {
                    return this.get("firstPageOnly") === true;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isDownloadAllPages: Ember.computed('firstPageOnly', {
                get: function () {
                    return this.get("firstPageOnly") === false;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isFirstPageOnlyCompatible: Ember.computed('selectedFormat', {
                get: function () {
                    return this.get("selectedFormat") === "download_bills" || this.get("selectedFormat") === "download_one";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                doCancel: function () {
                    this.hideModal();
                },

                doBillDownload: function () {
                    this.doRemoteAction(function () {
                            var url = this.get("downloadUrlWithSearchParams");
                            var id = this.get("selectedFormat");
                            var firstPageOnly = this.get("firstPageOnly");

                            if (id === "download_csv") {
                                var baseUrl = url.fmt(this.modelFor("biller").get("id"));
                                var url = firstPageOnly ? baseUrl + "&page=1" : baseUrl;
                                return Ember.$.get(url);
                            } else {
                                var allParams = this.controller.allSearchFilters();
                                allParams["notifyOnCompletion"] = this.get("notifyOnCompletion");

                                if (firstPageOnly) {
                                    allParams["pages"] = 1;
                                }
                                return Ember.$.post("/data/bills/download/%@".fmt(id), allParams);
                            }
                        },
                        function (results) {
                            if (results.success) {
                                if (results && results.action && results.action === "download") {
                                    window.location.assign(this.controller.get("downloadUrl") + "downloadFileId" + results.downloadFileId);
                                } else {
                                    if (this.get("notifyOnCompletion")) {
                                        this.showSuccessMessage("Your file is being prepared. You'll receive an email when it's ready");
                                    } else {
                                        this.showSuccessMessage("Your file is being prepared. You can download it from 'Jobs' when it's ready.");
                                    }
                                }
                            } else {
                                if (results.message) {
                                    this.showErrorMessage(results.message);
                                } else {
                                    this.showErrorMessage("An error occurred while downloading mail. Please try again later.");
                                }
                            }
                        },
                        "An error occurred while downloading mail. Please try again later.");
                },

                doClose: function () {
                    this.hideModal();
                },

                setSelectedFormat: function (value) {
                    this.set("selectedFormat", value);
                },

                setFirstPageOnly: function (value) {
                    this.set("firstPageOnly", value);
                }
            }
        });

        App.BillRefFieldMixin = Ember.Mixin.create({

            getMeta: function () {
                return this.get("meta");
            },

            _billRefFieldNames: function () {
                if (this.getMeta()) {
                    return this.getMeta().billRefFieldNames;
                }
                return null;
            },

            billRefField1Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames();
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef1Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            billRefField2Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames();
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef2Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            billRefField3Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames();
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef3Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            billRefField4Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames();
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef4Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            billRefField5Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames(this.get("model"));
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef5Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            billRefField6Name: Ember.computed("model", {
                get: function () {
                    var billRefFieldNames = this._billRefFieldNames();
                    if (billRefFieldNames) {
                        return billRefFieldNames.billRef6Field;
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

        });

        App.BillerBillsRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin,
            App.ModalProducingControllerMixin,
            App.BillDownloadModalMixin,
            App.BillUploadRouteMixin, {
                controllerName: 'bills',
                model: function (params) {

                    var searchParms = {
                        billerId: this.modelFor("biller").id,
                        type: params.type,
                        billStatus: this.modelFor("biller").get("meta").defaultBillStatus.split(","),
                        pageNumber: 1,
                        exactSearch: false,
                        exactSearchJobId: false
                    };

                    var newType = params.type;
                    if (["sendPending", "readyForDispatch", "sent", "undelivered", "undeliveredActioned", "archived"].contains(params.type)) {
                        searchParms.sortOrder = "id";
                        searchParms.sortDirection = "desc";
                    }

                    if (this.useOldFilters(searchParms.billerId)) {
                        searchParms = $.extend(searchParms, this.controller.allSearchFilters());
                        searchParms.type = newType;
                        if (searchParms.billStatus != null && searchParms.billStatus.indexOf(newType) < 0) {
                            searchParms.type = this.modelFor("biller").get("meta").defaultBillStatus.split(",")[0];
                        }
                    }

                    return this.execReload(searchParms);
                },

                afterModel: function (model) {
                    //if (model.query.type == "sendPending" && model.content.length == 0) {
                    //  this.transitionTo("biller.bills", this.modelFor("biller"), "sent");
                    //}
                },

                useOldFilters: function (billerId) {
                    return this.controller &&
                        this.controller.selectedFilters &&
                        (billerId == this.controller.selectedFilters.billerId);
                },

                setupController: function (controller, model) {
                    controller.set("meta", model.get("meta"));
                    this._super(controller, model);

                    var baseFilters = {
                        billerId: this.modelFor("biller").id,
                        type: model.query.type,
                        billStatus: this.controllerFor("biller").model.get("meta").defaultBillStatus.split(","),
                        billFormat: "-1",
                        exactSearch: false,
                        exactSearchJobId: false
                    };

                    var newType = model.query.type;

                    if (["sendPending", "readyForDispatch", "sent", "undelivered", "undeliveredActioned", "archived"].contains(baseFilters.type)) {
                        baseFilters.sortOrder = "id";
                        baseFilters.sortDirection = "desc";
                    }

                    if (this.useOldFilters(this.modelFor("biller").id)) {
                        baseFilters = $.extend(baseFilters, this.controller.allSearchFilters());
                        baseFilters.type = newType;
                        if (baseFilters.billStatus == null) {
                            baseFilters.billStatus = this.controllerFor("biller").model.get("meta").defaultBillStatus.split(",");
                        }
                        baseFilters.billFormat = this.controller.get("selectedFilters.billFormat");
                    }

                    //set the exact search checkboxes based on the previously set value
                    controller.set("exactSearchJobId", baseFilters.exactSearchJobId);
                    controller.set("exactSearch", baseFilters.exactSearch);

                    controller.setBaseFilters(baseFilters);
                    controller.set("biller", this.modelFor("biller"));
                },

                execReload: function (selectedFilters) {
                    return this.store.query("bill", selectedFilters);
                },

                actions: {

                    reloadData: function (selectedFilters) {
                        this.doRemoteAction(function () {
                                return this.execReload(selectedFilters);
                            },
                            function (results) {
                                this.controller.set("model", results);
                                this.controller.set("meta", results.get("meta"));
                            },
                            "An error occurred while retrieving the list of bills. Please try again later.");
                    },

                    downloadData: function (url) {
                        this.set("downloadUrlWithSearchParams", url);
                        this.showModal("bill-download-modal");
                    },

                    approve: function (bill) {
                        this.doRemoteAction(function () {
                                return Ember.$.post("/data/bills/%@/approve".fmt(bill.id));
                            },
                            function (results) {
                                if (results.success) {
                                    this.showSuccessMessage("Successfully approved mail.");
                                } else {
                                    this.showErrorMessage("An error occurred while approving the selected mail.");
                                }
                                this.send("reloadData", this.controller.allSearchFilters());
                            },
                            "An error occurred while approving the selected mail. Please try again later.");
                    },

                    upload: function (billIds, contactOption, billLoadType, selectedBillFormats, confirm, doneFn) {
                        this.doRemoteAction(function () {
                                return Ember.$.post("/data/bills/%@/doupload".fmt(this.modelFor("biller").id), {
                                    fileIds: billIds,
                                    contactOption: contactOption,
                                    confirm: confirm,
                                    billLoadType: billLoadType,
                                    billFormat: selectedBillFormats
                                });
                            },
                            function (results) {
                                doneFn(results);
                                if (results.success) {
                                    this.send("reloadData", this.controller.allSearchFilters());
                                    this.showSuccessMessage("File has been uploaded successfully and is being processed. Click the Jobs link above to view progress.");
                                }
                            },
                            function () {
                                doneFn({
                                    success: false,
                                    message: "An error occurred while uploading the selected mail. Please try again later."
                                })
                            });
                    },

                    approveAll: function () {
                        this.doRemoteAction(function () {
                                return Ember.$.post("/data/bills/%@/approveall".fmt(this.modelFor("biller").id), this.controller.allSearchFilters());
                            },
                            function (results) {
                                if (results.success) {
                                    this.showSuccessMessage("Payreq is processing your approvals. This may take a little while.");
                                    this.send("reloadData", this.controller.allSearchFilters());
                                } else {
                                    this.showErrorMessage("An error occurred while approving all bills with Approval needed status.");
                                }
                            },
                            "An error occurred while approving all bills with Approval needed status");
                    },

                    rejectAll: function () {
                        this.doRemoteAction(function () {
                                return Ember.$.post("/data/bills/%@/rejectall".fmt(this.modelFor("biller").id), this.controller.allSearchFilters());
                            },
                            function (results) {
                                if (results.success) {
                                    this.showSuccessMessage("Payreq is processing your rejections. This may take a little while.");
                                    this.send("reloadData", this.controller.allSearchFilters());
                                } else {
                                    this.showErrorMessage("An error occurred while rejecting all bills with Approval needed status.");
                                }
                            },
                            "An error occurred while rejecting all bills with Approval needed status");
                    },

                    downloadPaymentFiles: function (fromDate, toDate) {
                        window.open("/download/bills/%@/par?%@".fmt(this.modelFor("biller").get("id"), $.param({
                            fromDate: fromDate,
                            toDate: toDate
                        })))
                        this.showSuccessMessage("Payment files archive successfully generated. Download started.");
                    },

                    fetchNumberParFiles: function (fromDate, toDate, onSuccess) {
                        this.doRemoteAction(function () {
                                return Ember.$.get("/data/bills/%@/par".fmt(this.modelFor("biller").id), {
                                    fromDate: fromDate,
                                    toDate: toDate
                                });
                            },
                            function (results) {
                                if (results.success) {
                                    onSuccess(results.totalFiles);
                                } else onSuccess(0);
                            },
                            "An error occurred while fetching the count of the number of par files for the given date range.");
                    },

                    showAndHide: function () {
                        var collapseElement = $("#collapse1");
                        if (collapseElement.hasClass("in")) {
                            this.controller.set("collapse", false);
                        } else {
                            this.controller.set("collapse", true);
                        }
                    }
                }
            });

        var replaceSelectable = function (controller) {
            if (controller.get("showFormats")) {
                return controller.get("billFormats").filter(function (bf) {
                    return bf.get("selected");
                }).toArray().length <= 1;
            } else return true;
        };

        Ember.TEMPLATES['bills-dereg-error'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=strings.deregModalTitle actionButtons=deregErrorConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"confirmView\"}}" +
            "{{strings.deregModalMessage}}" +
            "{{/modal-dialog}}");

        Ember.TEMPLATES['bill-upload-modal'] = Ember.Handlebars.compile(billUploadModal);
        App.BillUploadMixin = Ember.Mixin.create({
            uploadIds: null,
            uploadComplete: false,
            errorMessage: null,
            affectedJobs: null,
            validationErrors: null,
            billFormatSelected: null,
            confirmationRequired: null,
            billUploadUrl: Ember.computed("biller", {
                get: function () {
                    return '/data/bills/' + this.get("biller").get("id") +'/upload';
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            application: Ember.inject.controller(),
            _baseActionButtons: [{
                actionName: "cancel"
            }, {
                primary: true,
                bsType: "btn-primary",
                actionName: "confirm",
                noClose: true
            }],

            uploadActionButtons: Ember.computed("strings", {
                get: function () {
                    return this.get("_baseActionButtons")
                        .map(function (btn) {
                            return App.ModelDialogActionButton.create($.extend({}, btn, {
                                label: this.get("strings.uploadActions")[btn.actionName]
                            }));
                        }.bind(this));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            _contactOptions: [{
                value: "add",
                selectable: function () {
                    return true;
                }
            }, {
                value: "replace",
                selectable: replaceSelectable
            }, {
                value: "ignore",
                selectable: function () {
                    return true;
                }
            }, {
                value: "add-no-bills",
                selectable: function () {
                    return true;
                }
            }, {
                value: "replace-no-bills",
                selectable: replaceSelectable
            }],

            contactOptions: Ember.computed("billFormats.@each.selected", {
                get: function () {
                    var me = this;
                    return this.get("_contactOptions")
                        .map(function (co) {
                            Ember.set(co, "name", me.get("strings.uploadModal." + co.value));
                            return co;
                        })
                        .filter(function (co) {
                            return co.selectable(this)
                        }.bind(this));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            onContactOptionsChange: function () {
                if (this.get("contactOptions").filter(function (co) {
                    return co.value == this.get("selectedContactOption");
                }.bind(this)).toArray().length == 0) {
                    this.set("selectedContactOption", this.get("contactOptions").objectAt(0).value);
                }
            }.observes("contactOptions.[]"),

            selectedContactOption: "add",

            showContactOptions: Ember.computed("biller", "billFormatSelected", "selectedBillLoadOption", function () {
                const selectedBillLoadOption = this.get("selectedBillLoadOption");
                const billFormatSelected = this.get("billFormatSelected");
                const ignoreContactBillFormat = this.get("billFormats").filter(function (bf) {
                    return bf.get("idString") === billFormatSelected && (bf.get("typeName") === "payt4" || bf.get("readBillerAccountNumberFromContact") || bf.get("forceIgnoreContacts"))
                });
                const ignoreContacts = ignoreContactBillFormat && ignoreContactBillFormat.length > 0;
                return !this.get("biller").hasFeature("external-contacts") && !ignoreContacts && selectedBillLoadOption !== "HISTORICAL";
            }),

            showSplittingInfo: Ember.computed("biller", "billFormatSelected", function () {
                return this.get("billFormatSelected") != null;
            }),

            splittingInfo: Ember.computed("biller", "billFormatSelected", function () {
                const billFormats = this.get("billFormats");
                const billFormatSelected = this.get("billFormatSelected");
                if (!billFormatSelected) return false;
                const selectedMyPayFormat = billFormats.get("length") === 1 ? billFormats.get("firstObject") : billFormats.filter(function (bf) {return bf.get("idString") === billFormatSelected;}).get("firstObject");
                const indicatorText = selectedMyPayFormat.get("splitEndFile") ? "splittingEndIndicatorText" : "splittingIndicatorText";
                return this.get("strings." + indicatorText).fmt(selectedMyPayFormat.get("indicator"));
            }),

            billLoadOptions: [{
                value: "STANDARD",
                name: billTranslations.all.uploadModal.billLoadTypes.standard
            }, {
                value: "ARCHIVE",
                name: billTranslations.all.uploadModal.billLoadTypes.archive
            }, {
                value: "HISTORICAL",
                name: billTranslations.all.uploadModal.billLoadTypes.historical
            }],

            selectedBillLoadOption: "STANDARD",

            showBillLoadOptions: Ember.computed("biller", function () {
                return this.get("biller.archivePermission");
            }),

            showFormats: Ember.computed("billFormats", {
                get: function () {
                    return (this.get("billFormats") || []).toArray().length > 0;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            showAvailableCredits: Ember.computed("biller", "billFormatSelected", function () {
                const billFormats = this.get("billFormats");
                const billFormatSelected = this.get("billFormatSelected");
                if (!billFormatSelected) return false;
                const selectedMyPayFormat = billFormats.get("length") === 1 ? billFormats.get("firstObject") : billFormats.filter(function (bf) {return bf.get("idString") === billFormatSelected;}).get("firstObject");
                return selectedMyPayFormat && ["payt4", "paystatement"].includes(selectedMyPayFormat.get("typeName"));
            }),

            availableCreditsText: Ember.computed("biller", "billFormatSelected", function () {
                var billFormats = this.get("billFormats");
                var billFormatSelected = this.get("billFormatSelected");
                var selectedMyPayFormat = billFormats.get("length") === 1 ? billFormats.get("firstObject") : billFormats.filter(function (bf) {return bf.get("idString") === billFormatSelected;}).get("firstObject");
                var credits = selectedMyPayFormat.get("credits");
                var typeName = selectedMyPayFormat.get("typeName") === "paystatement" ? "paystub" : "non paystub";
                return "" + (credits || 0) + " " + typeName + " credits";
            }),

            clearUploadMessages: Ember.observer("billFormatSelected",
                function () {
                    this.set("errorMessage", null);
                    this.set("affectedJobs", null);
                    this.set("confirmationRequired", null);
                    this.set("validationErrors", null);
                }),

            affectedJobsErrorMessage: Ember.computed("affectedJobs", "confirmationRequired", {
                get: function () {
                    if (this.get("affectedJobs")) {
                        if (this.get("confirmationRequired")) {
                            return this.get("strings.uploadModal.errors.confirmationRequired");
                        } else {
                            return this.get("strings.uploadModal.errors.jobRunning");
                        }
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            validationErrorMessage: Ember.computed("validationErrors", {
                get: function () {
                    if (this.get("validationErrors")) {
                        return this.get("strings.uploadModal.errors.validationErrors");
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            nonRunnableJobs: Ember.computed("affectedJobs", {
                get: function () {
                    return (this.get("affectedJobs") || [])
                        .filter(function (j) {
                            return j.get("runnableState") === "duplicate-running";
                        });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            reRunnableJobs: Ember.computed("affectedJobs", {
                get: function () {
                    return (this.get("affectedJobs") || [])
                        .filter(function (j) {
                            return j.get("runnableState") === "duplicate-finished";
                        });
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            deregErrorConfirmActionButtons: [App.ModelDialogActionButton.create({label: billTranslations.all.deregModalClose, actionName: "cancel", bsType: "btn-link"}),
                                             App.ModelDialogActionButton.create({primary: true, label: billTranslations.all.deregModalConfirm, actionName: "confirm", bsType: "btn-primary"})],

            actions: {
                confirmView: function() {
                    window.location.href = "customer#/biller/"+ this.get("biller").id +"/registrations/contactChanged";
                },

                markedAsChanged : function(value){
                    this.set("billFormatSelected", value);
                },

                uploadBill: function () {
                    var deregCount = this.get('model').meta.possibleDeregistrations;

                    if(deregCount > 0) {
                        this.set('strings', this.get('strings'));
                        this.showModal("bills-dereg-error");
                    } else {
                        this.send("prepareUploadModal", function (results) {

                            if (this.get('billFormatSelected') === null) {
                                this.set('billFormatSelected', results.get('firstObject').get('id'));
                            }

                            this.set('billFormats', results);
                            this.set('selectedContactOption', "add");
                            this.set('selectedBillLoadOption', "STANDARD");
                            this.set('uploadIds', []);
                            this.clearUploadMessages();
                            this.showModal("bill-upload-modal");
                        }.bind(this));
                    }
                },
                doUploadBill: function (closeFn) {
                    var me = this;
                    if (this.get('uploadIds') != null && this.get('uploadIds').length !== 0) {
                        this.set("uploadingFile", true);
                        this.send("upload",
                            this.get('uploadIds'),
                            this.get("showContactOptions") ? this.get('selectedContactOption') : "ignore",
                            this.get("showBillLoadOptions") ? this.get('selectedBillLoadOption') : "STANDARD",
                            this.get('billFormatSelected'),
                            this.get("confirmationRequired"),
                            function (result) {
                                me.set("uploadingFile", false);
                                if (result.success) {
                                    closeFn();
                                } else {
                                    if (result.message) {
                                        me.set("errorMessage", result.message);
                                    } else if (result.affectedJobs) {
                                        me.set("affectedJobs", result.affectedJobs.map(function (aj) {
                                            return Ember.Object.create(aj)
                                        }));
                                        me.set("confirmationRequired", result.confirmationRequired);
                                    } else if (result.validationErrors) {
                                        me.set("validationErrors", result.validationErrors.map(function (ve) {
                                            var validationError = Ember.Object.create(ve);
                                            validationError.billErrors.map(function (billError) {
                                                billError.errors.map(function (error) {
                                                    var errorMessage = me.get("strings.uploadModal.errors.billError").fmt(error.entity,
                                                        me.get("strings.billFieldDescription")[error.field],
                                                        error.reason);
                                                    Ember.set(error, "errorMessage", errorMessage);
                                                });
                                            });

                                            return validationError;
                                        }));
                                    }
                                }
                            });
                        this.clearUploadMessages();
                    }
                }
            },

            canUpload: Ember.computed("biller", {
                get: function () {
                    var permissions = this.get("application.permissions");
                    return this.get("biller").hasFeature("upload-multi-bill") && permissions.includes("bills.upload.multi");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isPrimaryDisabled: Ember.computed('uploadId', 'billFormatSelected', 'showFormats', {
                get: function () {
                    return this.get('uploadId') == null || (this.get("showFormats") &&
                        !this.get("billFormatSelected"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

        });

        Ember.TEMPLATES['download-payment-files-modal'] = Ember.Handlebars.compile(downloadPaymentFilesModal);
        App.DownloadPaymentFilesMixin = Ember.Mixin.create({
            downloadFromDate: "",
            downloadToDate: "",
            parFileCount: null,
            paymentFileActionButtons: [App.ModelDialogActionButton.create({
                actionName: "cancel",
                label: "Cancel"
            }),
                App.ModelDialogActionButton.create({
                    primary: true,
                    bsType: "btn-primary",
                    actionName: "confirm",
                    label: "Download"
                })
            ],

            canDownloadPaymentFiles: Ember.computed("biller", {
                get: function () {
                    var permissions = this.get("application.permissions");
                    return this.get("biller").hasFeature("download-payment-files") && permissions.includes("bills.download-payment-files");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            fetchFileCount: function () {
                if (this.get("downloadFromDate") && this.get("downloadToDate")) {
                    this.send("fetchNumberParFiles", this.get("downloadFromDate"), this.get("downloadToDate"), $.proxy(this.updateFileCount, this));
                }
            }.observes("downloadFromDate", "downloadToDate"),

            updateFileCount: function (fileCount) {
                this.set("parFileCount", fileCount);
            },

            isParPrimaryDisabled: Ember.computed("parFileCount", "downloadToDate", "downloadFromDate", {
                get: function () {
                    return !this.get("downloadToDate") ||
                        !this.get("downloadFromDate") ||
                        !this.get("parFileCount") ||
                        (this.get("parFileCount") === 0);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            parFilesToDownload: Ember.computed("parFileCount", {
                get: function () {
                    return (this.get("parFileCount") && this.get("parFileCount") > 0);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            parFileCountMessage: Ember.computed("parFileCount", {
                get: function () {
                    if (this.get("parFilesToDownload")) {
                        return this.get("strings.parFileModal.hasFiles").fmt(this.get("parFileCount"));
                    } else if (this.get("parFileCount") === 0) {
                        return this.get("strings.parFileModal.noFilesFound");
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                selectFromDate: function (date) {
                    this.set("downloadFromDate", date);
                },

                selectToDate: function (date) {
                    this.set("downloadToDate", date);
                },

                downloadParFiles: function () {
                    this.showModal("download-payment-files-modal");
                },

                doDownloadPaymentFiles: function () {
                    console.log(this.get("downloadFromDate"), this.get("downloadToDate"));
                    this.send("downloadPaymentFiles", this.get("downloadFromDate"), this.get("downloadToDate"))
                }

            }
        });

        App.BillsDisplayFieldMixin = Ember.Mixin.create({

            displayFields: Ember.computed("biller", {
                get: function () {
                    var biller = this.get("biller");
                    if (biller.get("displayFields")) {
                        return billsDisplayFields = biller.get("displayFields").filter(function (displayField) {
                            return displayField.displayEntityName == "bill";
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

            showBillerInvoiceNumber: Ember.computed("biller", {
                get: function () {
                    return this._showField("billerInvoiceNumber");
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
            showBillerAccountNumber: Ember.computed("biller", {
                get: function () {
                    return this._showField("billerAccountNumber");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showExtRefNumber: Ember.computed("biller", {
                get: function () {
                    return this._showField("extRefNumber");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showCreatedTime: Ember.computed("biller", {
                get: function () {
                    return this._showField("createdTime");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showReceivedTime: Ember.computed("biller", {
                get: function () {
                    return this._showField("receivedTime");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showAmountDue: Ember.computed("biller", {
                get: function () {
                    return this._showField("amountDue");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showDueDate: Ember.computed("biller", {
                get: function () {
                    return this._showField("dueDate");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showMinAmountDue: Ember.computed("biller", {
                get: function () {
                    return this._showField("minAmountDue");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showAccountBalance: Ember.computed("biller", {
                get: function () {
                    return this._showField("accountBalance");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showPrevAccountBalance: Ember.computed("biller", {
                get: function () {
                    return this._showField("prevAccountBalance");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillType: Ember.computed("biller", {
                get: function () {
                    return this._showField("billType");
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
            showFirstActionedTime: Ember.computed("biller", {
                get: function () {
                    return this._showField("firstActionedTime");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showNumPayersSentTo: Ember.computed("biller", {
                get: function () {
                    return this._showField("numPayersSentTo");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showNumPayersFailed: Ember.computed("biller", {
                get: function () {
                    return this._showField("numPayersFailed");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showJobId: Ember.computed("biller", {
                get: function () {
                    return this._showField("jobId");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showAutoPaymentStatus: Ember.computed("biller", {
                get: function () {
                    return this.get("biller.channelPartnerSystemId") !== "epost";
                }
            }),
            showBillRef1: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef1");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillRef2: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef2");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillRef3: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef3");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillRef4: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef4");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillRef5: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef5");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
            showBillRef6: Ember.computed("biller", {
                get: function () {
                    return this._showField("billRef6");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasPaidInPayreq: Ember.computed("model", {
                get: function() {
                    return (this.get("model").get("invoice") && this.get("model").get("invoice").gatewayTransactionId);
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),
        });


        Ember.TEMPLATES['biller/bills'] = Ember.Handlebars.compile(billsTemplate);
        App.BillsController = Ember.Controller.extend(App.TabularDataController,
            App.BillUploadMixin,
            App.DownloadPaymentFilesMixin,
            App.BillsStringsMixin,
            App.ModalProducingControllerMixin,
            App.BillsDisplayFieldMixin,
            App.BillRefFieldMixin, {
                pageSize: billsPageSize,
                prepareDownloadUrl: "/data/bills/%@/download?",
                downloadUrl: "/download/bills/download?",
                modelName: "bill",
                statusOptions: [
                    {"value": "sendPending", "display": billTranslations.all.sendPending},
                    {"value": "error", "display": billTranslations.all.error},
                    {"value": "pendingRegistration", "display": billTranslations.all.pendingRegistration},
                    {"value": "readyForDispatch", "display": billTranslations.all.readyForDispatch},
                    {"value": "archived", "display": billTranslations.all.archived},
                    {"value": "sent", "display": billTranslations.all.sent},
                    {"value": "undelivered", "display": billTranslations.all.undelivered},
                    {"value": "undeliveredActioned", "display": billTranslations.all.undeliveredActioned}
                ],

                placeholder: billTranslations.all.billStatusPlaceholder,

                globalStrings: globalStrings,

                _typeFilters: [
                    App.FilterType.create({
                        type: "sendPending",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "error",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "pendingRegistration",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "readyForDispatch",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "sent",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "undelivered",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "undeliveredActioned",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "archived",
                        count: 0
                    }),
                    App.FilterType.create({
                        type: "all",
                        count: 0
                    })
                ],

                typeFilters: Ember.computed("biller", "strings", {
                    get: function () {
                        var controller = this;
                        var statusSelected = controller.get("meta").defaultBillStatus.split(",");

                        var typeFilters = $.each(this.get("_typeFilters"),
                            function (idx, tf) {
                                tf.set("title", controller.get("strings.capitalised." + tf.get("type")));
                                if (statusSelected.contains(tf.get("type"))) {
                                    tf.set("visible", true);
                                } else {
                                    tf.set("visible", false);
                                }
                            });
                        return typeFilters;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                _columns: Ember.computed("biller", {
                    get: function () {
                        var _columns = [];
                        _columns.push(App.TableColumn.create({
                            fieldName: "billerInvoiceNumber",
                            sortable: true,
                            visible: this.get("showBillerInvoiceNumber")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "payerName",
                            sortable: true,
                            visible: this.get("showPayerName")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "billerAccountNumber",
                            sortable: true,
                            visible: this.get("showBillerAccountNumber")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "amountDue",
                            sortable: true,
                            rightAligned: true,
                            visible: this.get("showAmountDue")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "dueDate",
                            sortable: true,
                            visible: this.get("showDueDate")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "receivedTime",
                            sortable: true,
                            hiddenForTypes: ["undelivered", "undeliveredActioned"],
                            visible: this.get("showReceivedTime")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "sendToPrinter",
                            sortable: true,
                            rightAligned: true,
                            hiddenForTypes: ["error", "pendingRegistration", "archived"],
                            visible: true
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "documentPages",
                            sortable: true,
                            rightAligned: true,
                            visible: true
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "firstActionedTime",
                            sortable: true,
                            hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"],
                            visible: this.get("showFirstActionedTime")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "numPayersSentTo",
                            sortable: true,
                            rightAligned: true,
                            hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"],
                            visible: this.get("showNumPayersSentTo")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "numPayersFailed",
                            sortable: false,
                            rightAligned: true,
                            hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"],
                            visible: this.get("showNumPayersFailed")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "jobId",
                            sortable: true,
                            rightAligned: true,
                            visible: this.get("jobId")
                        }));
                        _columns.push(App.TableColumn.create({
                            fieldName: "status",
                            sortable: true,
                            visible: this.get("showStatus")
                        }));
                        _columns.push(App.TableColumn.create({
                            type: "action"
                        }));
                        return _columns;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                _downloadColumns: Ember.computed("biller", {
                    get: function () {
                        var _downloadColumns = [];
                        if (this.get("showBillerInvoiceNumber")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "billerInvoiceNumber"
                            }));
                        }

                        if (this.get("showPayerName")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "payerName"
                            }));
                        }

                        if (this.get("showBillerAccountNumber")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "billerAccountNumber"
                            }));
                        }

                        if (this.get("showAmountDue")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "amountDue"
                            }));
                        }

                        if (this.get("showDueDate")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "dueDate"
                            }));
                        }

                        if (this.get("showReceivedTime")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "receivedTime",
                                hiddenForTypes: ["undelivered", "undeliveredActioned"]
                            }));
                        }

                        if (this.get("showFirstActionedTime")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "firstActionedTime",
                                hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"]
                            }));
                        }

                        if (this.get("showNumPayersSentTo")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "numPayersSentTo",
                                hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"]
                            }));
                        }

                        if (this.get("showNumPayersFailed")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "numPayersFailed",
                                hiddenForTypes: ["sendPending", "error", "pendingRegistration", "archived"]
                            }));
                        }

                        if (this.get("showJobId")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "jobId"
                            }));
                        }

                        if (this.get("showStatus")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "status"
                            }));
                        }

                        if (this.get("showMinAmountDue")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "minAmountDue"
                            }));
                        }

                        if (this.get("showAccountBalance")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "accountBalance"
                            }));
                        }

                        if (this.get("showPrevAccountBalance")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "prevAccountBalance"
                            }));
                        }

                        if (this.get("showCreatedTime")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "createdTime"
                            }));
                        }

                        if (this.get("showBillType")) {
                            _downloadColumns.push(App.TableColumn.create({
                                fieldName: "billType"
                            }));
                        }

                        return _downloadColumns;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showSearch: Ember.computed("model", {
                    get: function () {
                        var search = this.get("collapse");
                        if (typeof search == 'undefined') {
                            return true;
                        }
                        return search;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                columns: Ember.computed("biller", "strings", {
                    get: function () {
                        var controller = this;
                        var columns = $.each(this.get("_columns"),
                            function (idx, column) {

                                if (column.get("fieldName") === "billerAccountNumber" && controller.getMeta().isMultiChannelBiller) {
                                    column.set("title", controller.get("strings.capitalised.contactId"));
                                } else {
                                    column.set("title", controller.get("strings.capitalised." + (column.get("fieldName") || column.get("type"))));
                                }
                            });
                        return columns;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                downloadColumns: Ember.computed("biller", "strings", {
                    get: function () {
                        var controller = this;

                        var columns = $.each(this.get("_downloadColumns"),
                            function (idx, column) {
                                if (column.get("fieldName") === "billerAccountNumber" && controller.getMeta().isMultiChannelBiller) {
                                    column.set("title", controller.get("strings.capitalised.contactId"));
                                } else {
                                    column.set("title", controller.get("strings.capitalised." + (column.get("fieldName") || column.get("type"))));
                                }
                            });

                        /*if(controller.get("strings.capitalised.extRefNumber")){
                          var column = App.TableColumn.create({fieldName: "extRefNumber"});
                          column.set("title", controller.get("strings.capitalised." + (column.get("fieldName") || column.get("type"))));
                          var index = columns.findIndex(function(column){
                            return column.get("fieldName")=="status";
                          });
                          columns.splice(index+1, 0, column);
                        }*/

                        for (var i = 1; i < 7; i++) {
                            if (controller.get("billRefField" + i + "Name")) {
                                var column = App.TableColumn.create({fieldName: "billRef" + i});
                                column.set("title", controller.get("billRefField" + i + "Name"));
                                var index = columns.findIndex(function (column) {
                                    return column.get("fieldName") == "status";
                                });
                                columns.splice(index + i, 0, column);
                            }
                        }

                        return columns;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                defaultDateRange: Ember.computed("model", {
                    get: function () {
                        return this.getMeta().defaultDateRange;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                isMultiChannelBiller: Ember.computed("model", {
                    get: function () {
                        return this.getMeta().isMultiChannelBiller;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                mailSchedule: Ember.computed("model", {
                    get: function () {
                        return this.get("meta").mailSchedule;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                canApproveAll: Ember.computed("biller", {
                    get: function () {
                        var permissions = this.get("application.permissions");
                        return permissions.includes("bills.review-by-biller.approve");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                canRejectAll: Ember.computed("biller", {
                    get: function () {
                        var permissions = this.get("application.permissions");
                        return permissions.includes("bills.review-by-biller.reject");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                noBillsToReview: Ember.computed("model", {
                    get: function () {
                        return (this.getMeta().reviewRequiredCount === 0);
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showApproveAllRejectAllButton: Ember.computed("model", {
                    get: function () {
                        var type = this.get("selectedFilters.type");
                        if (type == 'all' || type == 'sendPending') {
                            return true;
                        }
                        return false;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                hasStatusSelected: Ember.computed("model", {
                    get: function () {
                        var type = this.get("selectedFilters.billStatus");
                        if (type != null && type.length > 0) {
                            return true;
                        }
                        return false;
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

                helpMessage: Ember.computed("model", "strings", {
                    get: function () {
                        var controller = this;

                        return controller.get("strings.capitalised.helpMsg." + this.get("selectedFilters.type"));
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                searchableBillFormats: Ember.computed("model", {
                    get: function () {
                        return [{id: "-1", displayName: billTranslations.all.template + "..."}].concat(this.getMeta().billFormats);
                    }
                }),

                approveAllConfirmActionButtons: [App.ModelDialogActionButton.create({
                    label: "Cancel",
                    actionName: "cancel"
                }),
                    App.ModelDialogActionButton.create({
                        label: "Send all",
                        bsType: "btn-success",
                        actionName: "confirm"
                    })
                ],
                rejectAllConfirmActionButtons: [App.ModelDialogActionButton.create({
                    label: "Cancel",
                    actionName: "cancel"
                }),
                    App.ModelDialogActionButton.create({
                        label: "Delete all",
                        bsType: "btn-danger",
                        actionName: "confirm"
                    })
                ],


                actions: {

                    showConfirmApproveAll: function () {
                        var reviewRequiredCount = this.getMeta().reviewRequiredCount;
                        this.set("reviewRequiredCountMessage", this.get("strings.acceptAllConfirm").fmt(reviewRequiredCount));
                        this.showModal("bills-confirm-approve-all");
                    },

                    showConfirmRejectAll: function () {
                        var reviewRequiredCount = this.getMeta().reviewRequiredCount;
                        this.set("reviewRequiredCountMessage", this.get("strings.rejectAllConfirm").fmt(reviewRequiredCount));
                        this.showModal("bills-confirm-reject-all");
                    },

                    changedSelectionExactSearch: function () {
                        this.set("selectedFilters.exactSearch", !this.get("selectedFilters.exactSearch"));
                        if (this.get("selectedFilters.exactSearchJobId") === true){
                            this.set("selectedFilters.exactSearchJobId", !this.get("selectedFilters.exactSearchJobId"));
                            $("#exactmatchJobId").prop('checked', false);
                        }
                        this.send("reloadData", this.get("selectedFilters"));
                    },

                    changedSelectionJobId: function () {
                        this.set("selectedFilters.exactSearchJobId", !this.get("selectedFilters.exactSearchJobId"));
                        if (this.get("selectedFilters.exactSearch") === true){
                            this.set("selectedFilters.exactSearch", !this.get("selectedFilters.exactSearch"));
                            $("#exactmatch").prop('checked', false);
                        }
                        this.send("reloadData", this.get("selectedFilters"));
                    },

                    confirmApproveAll: function () {
                        this.send("approveAll");
                    },
                    confirmRejectAll: function () {
                        this.send("rejectAll");
                    },
                    changedSelection: function (_pre_selection, _selection) {
                        this.send("reloadData", this.get("selectedFilters"));
                    },
                }
            });

        Ember.TEMPLATES['bills-confirm-approve-all'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Send all bills\" actionButtons=approveAllConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"confirmApproveAll\"}}" +
            "{{{reviewRequiredCountMessage}}}" +
            "{{/modal-dialog}}");

        Ember.TEMPLATES['bills-confirm-reject-all'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Delete all bills\" actionButtons=rejectAllConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"confirmRejectAll\"}}" +
            "{{{reviewRequiredCountMessage}}}" +
            "{{/modal-dialog}}");


        App.BillerBillRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function (params) {
                return this._getBill(params.billId);
            },

            _getBill: function (id) {
                return this.store.findRecord("bill", id, {reload: true});
            },

            setupController: function (controller, model) {
                this._super(controller, model);
                controller.set("meta", model.get("meta"));
                controller.set("biller", this.modelFor("biller"));
            },

            actions: {
                refresh: function (bill) {
                    this.store.unloadRecord(bill);
                    this.doRemoteAction(function () {
                            return this._getBill(bill.id);
                            //return bill.reload();
                        },
                        function (results) {
                            this.controller.set("model", results);
                        },
                        "Could not refresh mail details. Please try again later.");
                },

                backToBills: function (bill) {
                    return window.document.location = "/portal/customer/biller/%@/mail".fmt(bill.get("billerActorId"));
                },

                approve: function (bill) {
                    var self = this;
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/bills/%@/approve".fmt(bill.id));
                        },
                        function (results) {
                            self.refresh();
                            if (results.success) {
                                if (results.status == "contact-changed") {
                                    this.showSuccessMessage("Bill status updated to contact changed.");
                                } else {
                                    this.showSuccessMessage("Successfully queued mail for sending.");
                                }
                            } else {
                                this.showErrorMessage("An error occurred while sending the selected mail.");
                            }
                        },
                        "An error occurred while sending mail. Please try again later.");
                },

                reject: function (bill) {
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/bills/%@/reject".fmt(bill.id));
                        },
                        function (results) {
                            if (results.success) {
                                this.showSuccessMessage("Successfully deleted mail.");
                                window.document.location = "/portal/customer/biller/%@/mail".fmt(bill.get("billerActorId"));
                            } else {
                                this.showErrorMessage("An error occurred while deleting the selected mail.");
                            }
                        },
                        "An error occurred while deleting mail. Please try again later.");
                },

                remove: function (bill) {
                    this.doRemoteAction(function () {
                            return bill.destroyRecord();
                        },
                        function (results) {
                            this.showSuccessMessage("Successfully deleted mail.");
                            window.document.location = "/portal/customer/biller/%@/mail".fmt(bill.get("billerActorId"));
                        },
                        "An error occurred while deleting mail. Please try again later.");
                },

                saveExternalAction: function (bill, actionDescription) {
                    var self = this;
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/bills/%@/saveExternalAction".fmt(bill.id), {actionDescription: actionDescription});
                        },
                        function (results) {
                            self.refresh();
                            this.showSuccessMessage("Successfully saved the external action.");
                        },
                        "An error occurred while saving the external action. Please try again later.");
                },

                cancelExternalAction: function (bill, actionDescription) {
                    var self = this;
                    this.doRemoteAction(function () {
                            return Ember.$.post("/data/bills/%@/cancelExternalAction".fmt(bill.id));
                        },
                        function (results) {
                            self.refresh();
                            this.showSuccessMessage("Successfully cancelled the external action.");
                        },
                        "An error occurred while cancelling the external action. Please try again later.");
                },

                saveBill: function (bill) {
                    var self = this;
                    this.doRemoteAction(function () {
                            Ember.set(bill, "validationFailures", []);
                            return bill.save();
                        },
                        function (results) {
                            self.refresh();
                            this.showSuccessMessage("Successfully updated bill.");
                        },
                        "An error occurred while updating the bill. Please try again later.");
                }
            }
        });

        App.BillPermissionsMixin = Ember.Mixin.create({
            canApprove: Ember.computed("model.waitingReview", "application.entityContext", {
                get: function () {
                    return this._canPerformReviewAction("approve");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canReject: Ember.computed("model.waitingReview", "application.entityContext", {
                get: function () {
                    return this._canPerformReviewAction("reject");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canRemove: Ember.computed("model.inDraft", "model.waitingCredit", "application.entityContext", {
                get: function () {
                    return this._hasPermission("bills.review-by-biller.reject") &&
                        (this.get("model.inDraft") || this.get("model.waitingCredit") || this.get("model.isPendingRegistration"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canUpdate: Ember.computed("model.inDraft", "model.status", "application.entityContext", {
                get: function () {
                    return this._hasPermission("bills.review-by-biller.reject") &&
                        (this.get("model.inDraft") || this.get("model.isPendingRegistration"));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canAddExternalAction: Ember.computed("model.hasBeenSent", "application.entityContext", {
                get: function () {
                    return this._hasPermission("bills.update.all") && this.get("model.hasBeenSent");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            canViewBillPdf: Ember.computed("application.entityContext", {
                get: function () {
                    return this._hasPermission("bills.view.all");
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            _canPerformReviewAction: function (action) {
                if (!this.get("model.waitingReview")) return false;

                if (this.get("application.entityContext")) {
                    return this._hasPermission("bills.review-by-biller." + action);
                } else {
                    return false;
                }
            },

            //TODO: should pull this out to the user entity?
            _hasPermission: function (permission) {
                var permissions = (this.get("application.permissions") || []);
                return permissions.includes(permission);
            }
        });


        Ember.TEMPLATES['external-action-modal'] = Ember.Handlebars.compile(externalActionModal);
        App.ExternalActionMixin = Ember.Mixin.create({
            actionDescription: null,
            application: Ember.inject.controller(),

            _baseActionButtons: [
                {
                    actionName: "cancel"
                },
                {
                    primary: true,
                    bsType: "btn-primary",
                    actionName: "save"
                }
            ],

            actionButtons: Ember.computed("strings", {
                get: function () {
                    return this.get("_baseActionButtons")
                        .map(function (btn) {
                            return App.ModelDialogActionButton.create($.extend({}, btn, {
                                label: this.get("strings.externalAction")[btn.actionName]
                            }));
                        }.bind(this));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isPrimaryDisabled: Ember.computed('actionDescription', {
                get: function () {
                    return this.get("actionDescription") == null || this.get("actionDescription").trim().length == 0;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                showActionModal: function () {
                    this.showModal("external-action-modal");
                },

                saveExternalActionAction: function (closeFn) {
                    this.send("saveExternalAction", this.get("model"), this.get("actionDescription"));
                }
            },
        });


        Ember.TEMPLATES['biller/bill'] = Ember.Handlebars.compile(billTemplate);
        App.BillerBillController = Ember.Controller.extend(App.ModalProducingControllerMixin,
            App.BillsStringsMixin,
            App.BillPermissionsMixin,
            App.BillsDisplayFieldMixin,
            App.ExternalActionMixin,
            App.FormHelperMixin,
            App.BillRefFieldMixin, {
                application: Ember.inject.controller(),
                bills: Ember.inject.controller(),


                hasFailedEmail: Ember.computed("model", {
                    get: function () {
                        var hasFailedEmail = false;
                        this.get("model.emailLogs").forEach(function (log) {
                            if (log.isFailed && hasFailedEmail == false) {
                                hasFailedEmail = true;
                            }
                        });
                        return hasFailedEmail;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                hasSentEmail: Ember.computed("model", {
                    get: function () {
                        var hasSentEmail = false;
                        this.get("model.emailLogs").forEach(function (log) {
                            if ((log.isSent || log.isDelivered) && hasSentEmail == false) {
                                hasSentEmail = true;
                            }
                        });
                        return hasSentEmail;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showEmails: Ember.computed("model", {
                    get: function () {
                        return this.get("model.emailLogs") != null;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                isEpostReplacement: Ember.computed("biller", "biller.product", {
                    get: function () {
                        return this.get("biller.product")==="Payreq Delivery" && this.get("model.channelPartnerSystemId") === "mybills";
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),


                totalCredits: Ember.computed("model", {
                    get: function () {
                        var creditTrans = this.get("model.billTransaction");
                        var creditTotal = 0;
                        if (creditTrans != null) {
                            for (var i = 0; i < creditTrans.length; i++) {
                                creditTotal = creditTotal + creditTrans[i].credit;
                            }
                        }
                        return creditTotal;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showTransactionCredits: Ember.computed("model", {
                    get: function () {
                        return this.get("model.billTransaction") != null;
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                deleteConfirmActionButtons: [App.ModelDialogActionButton.create({
                    label: "Cancel",
                    closeOnly: true
                }),
                    App.ModelDialogActionButton.create({
                        label: "Delete mail",
                        bsType: "btn-danger",
                        actionName: "confirm"
                    })
                ],

                cancelExternalActionConfirmActionButtons: [App.ModelDialogActionButton.create({
                    label: "Cancel",
                    closeOnly: true
                }),
                    App.ModelDialogActionButton.create({
                        label: "Cancel external action",
                        bsType: "btn-danger",
                        actionName: "confirm"
                    })
                ],

                showApprovalActions: Ember.computed("canApprove", "canReject", {
                    get: function () {
                        return this.get("canApprove") || this.get("canReject") || this.get("canRemove");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showBIllViewLogs: Ember.computed("model.channelPartnerSystemId", "model.status", {
                    get: function () {
                        return (this.get("model.channelPartnerSystemId") != "epost")
                            && ["ready-for-dispatch", "dispatched"].includes(this.get("model.status"));
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),

                showExternalActionButton: Ember.computed("model.numPayersFailed", "canAddExternalAction", "model.actioned", {
                    get: function () {
                        return this.get("model.numPayersFailed")
                            && this.get("model.numPayersFailed") > 0
                            && this.get("canAddExternalAction")
                            && !this.get("model.actioned");
                    },
                    set: function (key, newValue) {
                        return newValue;
                    }
                }),


                autoPaymentStatusText: Ember.computed("model", {
                    get: function () {
                        return this.get("model.billStrings.capitalised.autoPaymentStatusLabel")[this.get("model.autoPaymentStatus") || "none"];
                    }
                }),

                approvedByText: Ember.computed("model", "model.reviewedBy", "model.reviwedTime", {
                    get: function () {
                        return this.get("model.billStrings.capitalised.reviewedByValue").fmt(this.get("model.reviewedBy"), moment(this.get("model.reviewedTime")).format("DD MMM YYYY HH:mm:ss"));
                    }
                }),

                hasEmailDetails: Ember.computed("model", {
                    get: function () {
                        return this.get("model.emailDeliveryDetails") && this.get("model.emailDeliveryDetails").en;
                    }
                }),


                _validateBill: function (bill) {
                    this.removeErrors("#update-bill-form");

                    var errors = false;

                    if (this.get("showAmountDue")) {
                        if (!String.isBlank(bill.get("amountDue")) && !$.isNumeric(bill.get("amountDue"))) {
                            this.errorOnField("#amountDue", "Invalid amount");
                            errors = true;
                        }
                    }

                    if (this.get("showDueDate")) {
                        var dueDate = moment(bill.get("formattedDueDate"), 'DD-MMM-YYYY').toDate();
                        if (dueDate.toString().toUpperCase() == "Invalid Date".toUpperCase()) {
                            this.errorOnField("#dueDate", "Invalid date");
                            errors = true;
                        }
                    }

                    return !errors;
                },

                actions: {

                    promptRemoveBill: function () {
                        this.showModal("bill-confirm-remove");
                    },

                    confirmRemoveBill: function () {
                        this.send("remove", this.get("model"));
                    },

                    promptCancelExternalAction: function () {
                        this.showModal("bill-confirm-cancel-external-action");
                    },

                    confirmCancelExternalAction: function () {
                        this.send("cancelExternalAction", this.get("model"));
                    },

                    validateBill: function (bill) {
                        if (!String.isBlank(bill.get("formattedDueDate"))) {
                            var dueDate = moment(bill.get("formattedDueDate"), 'DD-MMM-YYYY').toDate();
                            Ember.set(bill, "dueDate", dueDate);
                        } else {
                            Ember.set(bill, "dueDate", null);
                        }

                        if (this._validateBill(bill)) {
                            this.send("saveBill", this.get("model"));
                        }
                    }
                }
            });

        Ember.TEMPLATES['bill-confirm-remove'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Delete mail\" actionButtons=deleteConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"confirmRemoveBill\"}}" +
            "Are you sure you want to delete this mail?" +
            "{{/modal-dialog}}");

        Ember.TEMPLATES['bill-confirm-cancel-external-action'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Cancel external action\" actionButtons=cancelExternalActionConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"confirmCancelExternalAction\"}}" +
            "Are you sure you want to cancel this external action?" +
            "{{/modal-dialog}}");

    });
