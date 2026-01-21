define(['i18n!nls/invoices',
        'text!templates/invoice-biller.html',
        'text!templates/incoming-email.html',
        'currency',
        'application', 'emberdata', 'billers', 'tabular-data-helper', 'document-viewer', 'moment',
        'modal-dialog', 'jqueryFileUpload', 'file-upload-component'],
    function (invoiceTranslations,
              invoiceBillerTemplate, incomingEmailTemplate, currency) {

        var attr = DS.attr;
        var invoicesPageSize = App.payreqConfig.bills.pageSize;

        App.BillerInvoicesinitRoute = App.BaseBillerRoute.extend({
            afterModel: function () {
                var previouslySelectedType = this.controllerFor("invoices").get("selectedFilters.type");
                console.log("biller.invoices", this.modelFor("biller"), previouslySelectedType || "paymentDue")
                this.transitionTo("biller.invoices", this.modelFor("biller"), "all");
            }
        });

        App.Invoice = DS.Model.extend({
            id: attr("number"),
            invoiceNo: attr(),
            description: attr(),
            billerActorId: attr(),
            payerActorId: attr(),
            dueDate: attr("date"),
            receivedTime: attr("date"),
            paymentDate: attr("date"),
            status: attr(),
            forwardingStatus: attr(),
            contentsType: attr(),
            receivedBy: attr(),
            amountDue: attr("number"),
            minAmountDue: attr("number"),
            billerName: attr(),
            documentHref: attr(),
            documentId: attr(),
            validationFailures: attr(),
            invoiceDelivery: attr(),
            gatewayTransactionId: attr(),
            totalInclSurcharge: attr(),
            scheme: attr(),
            cardNumberLastDigits: attr(),
            payable: attr("boolean"),
            forwardingField1: attr(),
            invoiceForwardingRule: attr(),
            invoiceForwardingResult: attr(),
            downloadStatus: attr(),
            latestDownload: attr(),
            showReturnToSender: attr("boolean"),
            autoPaymentId: attr("number"),
            autoPaymentStatus: attr(),
            debitLimit: attr("number"),
            installment: attr(),
            currencyCode: attr(),
            documentType: attr(),

            didLoad: function () {
                this._oldStatus = this.get("status");
                this._oldAmount = this.get("amountDue");
                this._oldDescription = this.get("description");
            },

            strings: Ember.computed({
                get: function () {
                    return invoiceTranslations;
                }
            }),

            invoicePdfUrl: Ember.computed("id", {
                get: function () {
                    return "/data/invoices/detail/" + this.get("id");
                }
            }),

            isInvoice: Ember.computed("documentType", {
                get: function () {
                    return this.get("documentType")  === "invoice";
                }
            }),

            documentTypeText: Ember.computed("documentType", {
                get: function () {
                    return invoiceTranslations.documentType[this.get("documentType")];
                }
            }),

            statusText: Ember.computed("status", {
                get: function () {
                    return invoiceTranslations.status[this.get("status")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            statusDescription: Ember.computed("status", "autoPaymentId", "dueDate", {
                get: function () {

                    if (this.get("status") !== "payment-due") {
                        return invoiceTranslations.statusDescription[this.get("status")]
                    }

                    if (this.get("autoPaymentStatus") === "scheduled") {
                        return invoiceTranslations.statusDescription.scheduled;
                    }

                    if (this.get("autoPaymentStatus") === "failed") {
                        return invoiceTranslations.statusDescription.failedAutoPayment;
                    }

                    if (this.get("autoPaymentStatus") === "above-limit") {
                        return invoiceTranslations.statusDescription.aboveDebitLimit;
                    }

                    return invoiceTranslations.statusDescription[this.get("status")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            downloadStatusDescription: Ember.computed("downloadStatus", {
                get: function () {
                    return invoiceTranslations.downloadStatusDescription[this.get("forwardingStatus") ? "na" : this.get("downloadStatus")];
                }
            }),

            downloadStatusClass: Ember.computed("downloadStatus", {
                get: function () {
                    return  this.get("downloadStatus") ? "" : "text-info";
                }
            }),

            paymentStatusClass: Ember.computed("paymentStatus", "autoPaymentStatus", {
                get: function () {
                    if (this.get("status") !== "payment-due") return "";
                    if (this.get("autoPaymentStatus") === "failed") return "text-danger";
                    if (this.get("autoPaymentStatus") === "above-limit") return "text-warning";
                    return "";
                }
            }),

            forwardingStatusDescription: Ember.computed("forwardingStatus", {
                get: function () {
                    return invoiceTranslations.forwardingStatusDescription[this.get("forwardingStatus") || "na"];
                }
            }),

            forwardingStatusClass: Ember.computed("forwardingStatus", {
                get: function () {
                    return  "failed" === this.get("forwardingStatus") ? "text-danger" : "";
                }
            }),

            contentsText: Ember.computed("contentsType", {
                get: function () {
                    return invoiceTranslations.contentsType[this.get("contentsType")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            receivedByText: Ember.computed("receivedBy", {
                get: function () {
                    return invoiceTranslations.receivedBy[this.get("receivedBy")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            channelPartnerSystemIdText: Ember.computed("channelPartnerSystemId", {
                get: function () {
                    return invoiceTranslations.channelPartnerSystemId[this.get("channelPartnerSystemId")];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            amountAsCurrency: Ember.computed("amountDue", "currencyCode", {
                get: function () {
                    return currency.toCurrency(this.get('currencyCode'), this.get('amountDue'));
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            schemeLabel: Ember.computed("scheme", {
                get: function () {
                    return {
                        visa: "Visa",
                        mastercard: "Mastercard",
                        amex: "American Express",
                        diners: "Diners Club International",
                        japcb: "Japanese Credit Bureau",
                        laser: "Laser Deposits",
                        solo: "Solo"
                    }[this.get('scheme')];
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            paidAmountAsCurrency: Ember.computed("totalInclSurcharge", "currencyCode", {
                get: function () {
                    return currency.toCurrency(this.get('model').currencyCode, this.get('model').totalInclSurcharge);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            formattedDueDate: Ember.computed("dueDate", {
                get: function () {
                    var newDate = new Date(this.get('dueDate'));
                    return newDate;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

        });



        Ember.TEMPLATES['confirm-status-update'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"Update Invoice Status\" actionButtons=updateInvoiceStatusConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"bulkStatusUpdate\"}}" +
            "Are you sure you want to update the status of <strong>{{{countInvoicesToUpdate}}}</strong> Invoices?" +
            "{{/modal-dialog}}");

        App.InvoiceBiller = DS.Model.extend({
            tagName: attr(),
            email: attr()
        });

        App.BillerInvoiceBillerRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function (params) {
                return this._getInvoiceBiller(params.invoiceBillerId, this.modelFor("biller").id);
            },

            setupController: function (controller, model) {
                controller.set('model', model);
            },

            _getInvoiceBiller: function (billerActorId, payerActorId) {
                //have to do a song and dance with a promise here because the
                //invoice biller ID doesn't carry the context of the payer ID and so we need to pass two parameters
                return this.store.query("invoiceBiller", {
                    billerActorId: billerActorId,
                    payerActorId: payerActorId
                }).then(function (resp) {
                    return resp.objectAt(0);
                });
            },
            actions: {
                saveInvoiceBiller: function (invoiceBiller) {
                    this.doRemoteAction(function () {
                            return invoiceBiller.save();
                        },
                        function (results) {
                            this.showSuccessMessage("Successfully updated biller.");
                        },
                        function (results) {
                            this.showErrorMessage("An error occured while updating the selected biller. Please try again later.");
                            invoiceBiller.rollbackAttributes();
                        });
                }
            }
        });

        Ember.TEMPLATES['biller/invoiceBiller'] = Ember.Handlebars.compile(invoiceBillerTemplate);
        App.BillerInvoiceBillerController = Ember.Controller.extend({
            actions: {
                updateBiller: function () {
                    var mo = this.get("model");
                    this.send("saveInvoiceBiller", this.get("model"));
                }
            }
        });

        App.BillerIncomingEmailRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
            model: function (params) {
                return this._getIncomingEmail(this.modelFor("biller").id);
            },

            _getIncomingEmail: function (billerId) {
                return Ember.$.get("/data/invoices/incomingEmail/%@".fmt(billerId));
            },

            setupController: function (controller, model) {
                controller.initialiseEmail(model.incomingEmail);
            }
        });

        Ember.TEMPLATES['biller/incomingEmail'] = Ember.Handlebars.compile(incomingEmailTemplate);
        App.BillerIncomingEmailController = Ember.Controller.extend({
            prefix: "pre",
            suffix: "suf",
            id: "1234",
            fullEmail: Ember.computed("prefix", "suffix", {
                get: function () {
                    var prefix = this.get("prefix");
                    var suffix = this.get("suffix");
                    prefix = prefix === "" ? prefix : prefix + ".";
                    suffix = suffix === "" ? suffix : "." + suffix;
                    return "%@%@%@@payreq.com".fmt(prefix, this.get("id"), suffix);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            initialiseEmail: function (email) {
                if (email) {
                    var parts = email.split(/@/);
                    var parts = parts[0].split(/\./);
                    console.log(parts);
                    if (parts.length === 3) {
                        this.set("prefix", parts[0]);
                        this.set("id", parts[1]);
                        this.set("suffix", parts[2]);
                    } else if (parts.length === 2) {
                        if (parts[0].length > parts[1].length) {
                            this.set("prefix", "");
                            this.set("id", parts[0]);
                            this.set("suffix", parts[1]);
                        } else {
                            this.set("prefix", parts[0]);
                            this.set("id", parts[1]);
                            this.set("suffix", "");
                        }
                    } else {
                        this.set("prefix", "");
                        this.set("id", parts[0]);
                        this.set("suffix", "");
                    }
                }
            },

            actions: {
                updateEmail: function () {
                    console.log("update email address");
                }
            }
        });
    });
