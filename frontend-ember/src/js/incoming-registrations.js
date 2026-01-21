define(['i18n!nls/incomingregistrations',
        'text!templates/incoming-myob.html',
        'text!templates/incoming-reckon.html',
        'text!templates/incoming-registration.html',
        'text!templates/mybillsagent-import-modal.html',
        'text!templates/import-from-text.html',
        'text!templates/confirm-deregister-modal.html',
        'moment',
        'application', 'emberdata', 'billers', 'tabular-data-helper', 'document-viewer', 'form-helper',
        'modal-dialog', 'jqueryFileUpload', 'file-upload-component', 'jqueryUI', 'strings', 'registrations'],
    function(translations, myobTemplate, reckonTemplates, incomingRegistrationTemplate, mybillsagentImportModal, importFromTextTemplate, confirmDeregistrationModal, moment) {

        var attr = DS.attr;

        App.Payerregistration = DS.Model.extend({
            id: attr("number"),
            status: attr(),
            channelPartnerSystemId: attr(),
            billerId: attr("number"),
            payerId: attr("number"),
            accountNumber: attr(),
            nameAccountHeld: attr(),
            authItem1: attr(),
            authItem1Field: attr(),
            useAuthItem1: attr("boolean"),
            authItem2: attr(),
            authItem2Field: attr(),
            useAuthItem2: attr("boolean"),
            authItem3: attr(),
            authItem3Field: attr(),
            useAuthItem3: attr("boolean"),
            authItem4: attr(),
            authItem4Field: attr(),
            useAuthItem4: attr("boolean"),
            registrationContactIdField: attr(),
            billerActorId: attr(),
            createdDate: attr("date"),
            activatedDate: attr("date"),
            deactivatedDate: attr("date"),
            deactivatedReason: attr(),
            channelRef1: attr(),
            channelRef2: attr(),
            channelRef3: attr(),
            channelRef4: attr(),
            channelRef5: attr(),
            channelRef6: attr(),
            tagName: attr(),
            channel: attr(),
            xeroaccounts: attr(),
            isXeroconnect: attr(),
            myobaccounts: attr(),
            isMyob: attr(),
            reckonvendors: attr(),
            reckonaccounts: attr(),
            reckontaxcodes: attr(),
            reckonterms: attr(),
            supplier: attr(),
            isReckon: attr(),
            isEmail: attr(),
            details: attr(),
            maxNoDetails: attr(),

            createdDateFormatted: Ember.computed("createdDate", {
                get: function() {
                    var dateTimeFormat = "DD MMM YYYY hh:mm:ss a";
                    return moment(this.get("createdDate")).format(dateTimeFormat);
                }
            }),

            deactivatedDateFormatted: Ember.computed("deactivatedDate", {
                get: function() {
                    var dateTimeFormat = "DD MMM YYYY hh:mm:ss a";
                    return moment(this.get("deactivatedDate")).format(dateTimeFormat);
                }
            }),

            regStrings: Ember.computed("channelPartnerSystemId", {
                get: function() {
                    return App.StringsMap.create({baseMap: translations, classifier: this.get("channelPartnerSystemId")});
                }
            }),

            statusDisplay: Ember.computed("status", {
                get: function() {
                    var mapping = this.get("regStrings.statusDisplay");
                    return mapping[this.get("status")];
                }
            }),

            channelPartnerSystemDisplay: Ember.computed("channelPartnerSystemId", "regStrings", {
                get: function() {
                    var mapping = this.get("regStrings.channels")
                    return mapping[this.get("channelPartnerSystemId")];
                }
            }),

            statusDescription: Ember.computed("status", "deactivatedReason", "regStrings", {
                get: function() {
                    var statusDescription = this.get("regStrings.statusDescription");
                    return statusDescription[this.get("deactivatedReason")];
                }
            }),

        });

        App.IncomingRegistrationsValidation = Ember.Mixin.create({
            isValidStringFormat: function(strFormat, registrationfield) {
                if (!String.isBlank(strFormat)) {
                    if (!(new RegExp(strFormat)).test(registrationfield)) {
                        return false;
                    }
                }
                return true;
            },

        });

        App.IncomingRegistrationStringsMixin = Ember.Mixin.create({
            strings: Ember.computed("biller.channelPartnerSystemId", "biller.extBillerId", "biller.masterBiller", {
                get: function() {
                    var extBillerId = null;
                    if(this.get("biller.masterBiller")){
                        extBillerId = this.get("biller.masterBiller").extBillerId;
                    }else{
                        extBillerId = this.get("biller.extBillerId");
                    }
                    return App.StringsMap.create({baseMap: translations,
                        classifier: this.get("biller.channelPartnerSystemId"),
                        classifier2: this.get("biller.channelPartnerSystemId")+"-"+extBillerId});
                },
                set: function(key, newValue) {
                    return newValue;
                }
            })
        });

        App.AuthFieldMixin = Ember.Mixin.create({
            hasAuthField1: Ember.computed("model", {
                get: function () {
                    return this.get('model.channel.authItem1Field') && this.get('model.channel.useAuthItem1');
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasAuthField2: Ember.computed("model", {
                get: function () {
                    return this.get('model.channel.authItem2Field') && this.get('model.channel.useAuthItem2');
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasAuthField3: Ember.computed("model", {
                get: function () {
                    return this.get('model.channel.authItem3Field') && this.get('model.channel.useAuthItem3');
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasAuthField4: Ember.computed("model", {
                get: function () {
                    return this.get('model.channel.authItem4Field') && this.get('model.channel.useAuthItem4');
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),
        });

        Ember.TEMPLATES['mybillsagent-import-modal'] = Ember.Handlebars.compile(mybillsagentImportModal);
        App.MybillsagentImportMixin = Ember.Mixin.create({
            application: Ember.inject.controller(),
            uploadedInfo: null,
            replaceAll: false,
            showLoading: false,
            importActionButtons: [App.ModelDialogActionButton.create({label: "Cancel", actionName: "cancel", bsType: "btn-link"}),
                App.ModelDialogActionButton.create({
                    label: "Import", primary: true,
                    bsType: "btn-primary", actionName: "confirm"
                })],

            mybillsagentUploadUrl: Ember.computed("replaceAll", "biller.id", {
                get: function () {
                    var url = ("/data/payerregistrations/%@/mailer/%@/bulk/import-file/%@").fmt(this.get("biller").get("id"), this.modelFor("biller").get("currentMailer"), false);
                    return url;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            clear: function () {
                this.set('replaceAll', false);
                this.set('uploadedInfo', null);
                this.set('showLoading', false);
            },

            isPrimaryDisabled: Ember.computed('uploadedInfo', 'uploadError', 'validationError', {
                get: function () {
                    return (this.get('uploadedInfo') == null || this.get('uploadError') != null || this.get('validationError') != null);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            confirmationRequired: Ember.computed("uploadedInfo.result", "validationError", {
                get: function () {
                    if (!this.get("validationError")) {
                        return this.get("uploadedInfo.result.confirmationRequired");
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            uploadError: Ember.computed('uploadedInfo', 'confirmationRequired', 'strings', {
                get: function () {
                    if (typeof this.get('uploadedInfo.error') === 'string') {
                        return this.get('uploadedInfo.error');
                    } else if (this.get('uploadedInfo.error.affectedJob')) {
                        return this.get("strings.mybillsagentImportModal.error.fileAlreadyUploadedRunning");
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            onUploadedInfo: function () {
                this.set('showLoading', false);
            }.observes("uploadedInfo"),

            uploadHasErrors: Ember.computed("validationError", "uploadError", {
                get: function () {
                    if (this.get("validationError") || this.get("uploadError")) {
                        return true;
                    } else return false;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            validationError: Ember.computed("uploadedInfo.result", "replaceAll", {
                get: function () {
                    if (this.get("replaceAll")) {
                        return this.get("uploadedInfo.result.replace.errors");
                    } else {
                        return this.get("uploadedInfo.result.add.errors");
                    }
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            affectedJob: Ember.computed("uploadedInfo", "validationError", {
                get: function () {
                    if (!this.get("validationError")) {
                        if (typeof this.get("uploadedInfo.error") === "object") {
                            return Ember.Object.create(this.get("uploadedInfo.error")).get("affectedJob");
                        } else if (this.get("uploadedInfo.result")) {
                            return Ember.Object.create(this.get("uploadedInfo.result")).get("affectedJob");
                        }
                    } else return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            confirmationMessage: Ember.computed('uploadedInfo', 'replaceAll', {
                get: function () {
                    if (this.get('uploadedInfo') && this.get('uploadedInfo.result')) {
                        var result = this.get('uploadedInfo.result');

                        var counts = result.counts;
                        var errors = result.errors;

                        if (!errors) {
                            var importSummary = "";

                            if (counts.addCount || counts.addCount == 0) {
                                importSummary = "Registrations to add : " + counts.addCount + "<br>";
                            }
                            if (counts.errorCount || counts.errorCount == 0) {
                                importSummary = importSummary + "Registrations with missing data : " + counts.errorCount + "<br>";
                            }

                            return this.get("strings.mybillsagentImportModal.importConfirmation").fmt(importSummary);
                        }
                    }
                    return null;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),


            importInstructions: Ember.computed("biller.id", {
                get: function () {

                    //contact field names
                    var contactFieldNames = this.get("model.channel.registrationContactIdField");


                    authFieldNames = "<strong>" + contactFieldNames + "</strong>";

                    var sampleData = "<br>";
                    for (var i = 1; i < 4; i++) {
                        sampleData = sampleData + "\"0000" + i + "\",\"" + "Name " + i + "\"";

                        sampleData = sampleData + "<br>";
                    }

                    return this.get("strings.mybillsagentImportModal.instructions").fmt(authFieldNames, sampleData);
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            isCancelDisabled: Ember.computed("uploadedInfo", {
                get: function () {
                    return true;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            actions: {
                importMybillsagent: function () {
                    this.clear();
                    this.showModal("mybillsagent-import-modal")
                },
                doImport: function () {
                    this.send("persistImported", this.get('uploadedInfo.fileDataId'));
                },

                doClose: function () {
                    if (this.get('uploadedInfo') && this.get('uploadedInfo').fileDataId) {
                        this.send("clearFileDataInSession", this.get('uploadedInfo').fileDataId);
                    }
                    this.hideModal();
                },

                setUploading: function () {
                    this.set('showLoading', true);
                },
            }
        });

    Ember.TEMPLATES['biller/incoming/myob'] = Ember.Handlebars.compile(myobTemplate);

    App.BillerIncomingMyobRoute =  App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin , App.FormHelperMixin, App.IncomingRegistrationsValidation, {
        model: function(params){
            this.modelFor("biller").set("currentMailer", params.mailerId);
            return Ember.$.get("/data/payer/registrations/%@/mailer/%@/channels/selfservice/myob".fmt(this.modelFor("biller").get("id"),  params.mailerId));

        },
        setupController: function (controller, model) {
            this._super(controller, model);
            controller.set("registrationField", model.previousFields.registrationField);
            controller.set("authfield1", model.previousFields.authField1);
            controller.set("authfield2", model.previousFields.authField2);
            controller.set("authfield3", model.previousFields.authField3);
            controller.set("authfield4", model.previousFields.authField4);
            controller.set("channelref1", model.previousFields.channelRef1);
            controller.set("channelref2", model.previousFields.channelRef2);
            controller.set("channelref3", model.previousFields.channelRef3);
            var product = "3";
            if (model.connection){
                product = model.connection.extraInfo2;
            }
            controller.set("myobProduct", product);
            controller.set("channelref4", model.previousFields.channelRef4);
            controller.set("contactExists", true);
            controller.set("errormessage", null);
            controller.set("accept", false);
            controller.set("disableSubmit", false);
            controller.set("biller", this.modelFor("biller"));
            controller.set("model", model);
            // set the contactExists based on the defaults
            Ember.$.get("/data/payer/registrations/%@/mailer/%@/myob/%@".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer"), model.previousFields.channelRef2))
                .done($.proxy(function (response) {
                if (response.success) {
                    controller.set("contactExists", !response.contactExists)
                }
            }, this));
        },

        validateRegistration: function(registration){
            this.removeErrors("#myob-connect-form");

            var isValidRegistration = true;
            const maxLengthErrorMsg = "This field must be less than 256 characters";

            if(registration.accept == false){
                isValidRegistration = false;
                this.errorOnField("#accept", "Please accept terms and conditions");
            }

            if(String.isBlank(registration.registrationfield)){
                isValidRegistration = false;
                this.errorOnField("#registrationField", "Please enter value for mandatory field.")
            } else if (!this.isValidStringFormat(this.controller.get('model.channel.registrationContactIdFormat'), registration.registrationfield)) {
                isValidRegistration = false;
                this.errorOnField("#registrationField", this.controller.get('model.channel.registrationContactIdValidationMsg'))
            } else if (registration.registrationfield && registration.registrationfield.length > 255){
                isValidRegistration = false;
                this.errorOnField("#registrationField", maxLengthErrorMsg)
            }

            if(this.controller.get('model.channel.useAuthItem1') && String.isBlank(registration.authfieldone)){
                isValidRegistration = false;
                this.errorOnField("#authfield1", "Please enter value for mandatory field.")
            }

            if(this.controller.get('model.channel.useAuthItem2') && String.isBlank(registration.authfieldtwo)){
                isValidRegistration = false;
                this.errorOnField("#authfield2", "Please enter value for mandatory field.")
            }

            if(this.controller.get('model.channel.useAuthItem3') && String.isBlank(registration.authfieldthree)){
                isValidRegistration = false;
                this.errorOnField("#authfield3", "Please enter value for mandatory field.")
            }

            if(this.controller.get('model.channel.useAuthItem4') && String.isBlank(registration.authfieldfour)){
                isValidRegistration = false;
                this.errorOnField("#authfield4", "Please enter value for mandatory field.")
            }
            if (registration.authfieldone && registration.authfieldone.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield1", maxLengthErrorMsg)
            }
            if (registration.authfieldtwo && registration.authfieldone.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield2", maxLengthErrorMsg)
            }
            if (registration.authfieldthree && registration.authfieldthree.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield3", maxLengthErrorMsg)
            }
            if (registration.authfieldfour && registration.authfieldfour.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield4", maxLengthErrorMsg)
            }

            return isValidRegistration;
        },

        actions: {
            saveRegistration: function (registrationField, authfield1, authfield2, authfield3, authfield4, channelref1, channelref2, channelref3, channelref4, accept) {
                this.controller.set("disableSubmit", true);
                var registration = {registrationfield: registrationField, authfieldone: authfield1, authfieldtwo: authfield2,
                    authfieldthree: authfield3, authfieldfour: authfield4, channelrefone: channelref1, channelreftwo: channelref2,
                    channelrefthree: channelref3, channelreffour: channelref4, accept: accept};
                if(this.validateRegistration(registration)){
                    Ember.$.post("/data/payer/registrations/%@/mailer/%@/channels/selfservice/myob".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer")),
                        registration)
                        .always($.proxy(function() {this.controller.set("disableSubmit", false);}, this))
                        .done($.proxy(function(response){
                            if (response.success) {
                                this.transitionTo("biller.incoming.registration", response.registration.id);
                                this.showSuccessMessage("MYOB Registration Created.");
                            }else {
                                this.controller.set("errormessage", response.errorMessage);
                                if (response.errorMessage){
                                    this.showErrorMessage("We are unable to save your registration due to validation errors. Please see top of the page for error details.");
                                    this.errorOnField("#registrationField", response.errorMessage)
                                } if (response.errorMessageTwo){
                                    this.controller.set("errormessage", response.errorMessageTwo);
                                    this.showErrorMessage(response.errorMessageTwo)
                                }
                                else {
                                    this.showErrorMessage("We are unable to save your registration. Please try again later.");
                                }

                            }
                        }, this));
                } else {
                    this.controller.set("disableSubmit", false);
                    this.showErrorMessage("We are unable to save your registration. Please see fields for errors.");
                }

            },

            connectToMyob: function(myobProduct){
                    return Ember.$.get("/data/settings/myob/%@/connecttomyob/%@/%@".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer"), "registration"), {product: myobProduct})
                        .done($.proxy(function(response){
                                window.top.location.href = response.requesttoken.uri;
                        }, this));

            },
        }
    });

    App.BillerIncomingMyobController = Ember.Controller.extend(
        App.ModalProducingControllerMixin,
        App.IncomingRegistrationStringsMixin,
        App.AuthFieldMixin,
        App.FormHelperMixin, {
            application: Ember.inject.controller(),

            gstInclusiveExclusive: Ember.computed({
                get: function() {
                    return [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            amountTotalOrMinimum: Ember.computed({
                get: function() {
                    return [{id: "TOTAL", name: "Total Amount"}, {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            correct: Ember.computed("channelref4", {
                get: function() {
                    return this.get("channelref4") === "correct";
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            incorrect: Ember.computed("channelref4", {
                get: function () {
                    return this.get("channelref4") === "incorrect";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            myobContactExists: Ember.observer("channelref2",  function(){
                    Ember.$.get("/data/payer/registrations/%@/mailer/%@/myob/%@".fmt(this.get("biller.id"), this.get("biller.currentMailer"), this.get("channelref2")))
                        .done($.proxy(function (response) {
                            if (response.success) {
                                this.set("contactExists", !response.contactExists);
                            } else {
                                this.set("contactExists", true);
                            }
                        }, this));
            }),

            myobProducts: Ember.computed({
                get: function() {
                    return [{id: "3", name: "MYOB AccountRight"}, {id: "1", name: "MYOB Essentials AU"}, {id: "2", name: "MYOB Essentials NZ"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            isEssentials: Ember.computed("myobProduct", {
                get: function() {
                    return this.get("myobProduct") === "1" || this.get("myobProduct") === "2";
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            hasMyobBusinesses: Ember.computed("model", {
                get: function() {
                    if(this.get("model.myobaccounts").toArray().length == 0){
                        return false;
                    }
                    return true;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            myobProductDisplay: Ember.computed( "strings", "model.connection.product",  {
                get: function() {

                    return this.get("strings.capitalised.myobProducts." + this.get("model.connection.product"));
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            myobConnectionDateFormatted: Ember.computed("model", {
                get: function() {
                    return moment(this.get('model.connection.connectedDate')).format("DD MMMM YYYY H:mm");
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            hasMyobConnection: Ember.computed("model", {
                get: function() {
                    if(this.get('model.connection')){
                        return true;
                    }
                    return false;
                },
                set: function (key, newvalue){
                    return newValue;
                }
            }),



            actions:{
                markedAsChanged : function(value){
                    this.set("channelref4", value);
                },
            },

        });

    Ember.TEMPLATES['biller/incoming/reckon'] = Ember.Handlebars.compile(reckonTemplates);

    App.BillerIncomingReckonRoute =  App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin , App.FormHelperMixin, App.IncomingRegistrationsValidation, {
        model: function(params){
            this.modelFor("biller").set("currentMailer", params.mailerId);
            return Ember.$.get("/data/payer/registrations/%@/mailer/%@/channels/selfservice/reckon".fmt(this.modelFor("biller").get("id"),  params.mailerId));

        },
        setupController: function (controller, model) {
            this._super(controller, model);
            controller.set("registrationField", model.previousFields.registrationField);
            controller.set("authfield1", model.previousFields.authField1);
            controller.set("authfield2", model.previousFields.authField2);
            controller.set("authfield3", model.previousFields.authField3);
            controller.set("authfield4", model.previousFields.authField4);
            controller.set("channelref1", model.previousFields.channelRef1);
            controller.set("channelref2", model.previousFields.channelRef2);
            controller.set("channelref3", model.previousFields.channelRef3);
            var reckonCountry = "Australia";
            if (model.connection){
                reckonCountry = model.connection.extraInfo2;
            }

            if(model.reckonterms && model.reckonterms.length > 0){
                controller.set("terms", model.reckonterms[0].id);
            }

            controller.set("reckonCountry", reckonCountry);
            controller.set("channelref4", model.previousFields.channelRef4);
            controller.set("createSupplier", "incorrect");
            controller.set("errormessage", null);
            controller.set("accept", false);
            controller.set("disableSubmit", false);
            controller.set("suppliersLoading", false);
            controller.set("biller", this.modelFor("biller"));
            controller.set("model", model);
        },

        validateRegistration: function(registration){
            this.removeErrors("#reckon-form");

            var isValidRegistration = true;
            const maxLengthErrorMsg = "This field must be less than 256 characters";

            if(registration.accept == false){
                isValidRegistration = false;
                this.errorOnField("#accept", "Please accept terms and conditions");
            }

            if(String.isBlank(registration.registrationfield)){
                isValidRegistration = false;
                this.errorOnField("#registrationField", "Please enter value for mandatory field.")
            }else if (!this.isValidStringFormat(this.controller.get('model.channel.registrationContactIdFormat'), registration.registrationfield)) {
                isValidRegistration = false;
                this.errorOnField("#registrationField", this.controller.get('model.channel.registrationContactIdValidationMsg'))
            } else if (registration.registrationfield && registration.registrationfield.length > 255){
                isValidRegistration = false;
                this.errorOnField("#registrationField", maxLengthErrorMsg)
            }

            if(this.controller.get('model.channel.useAuthItem1') && String.isBlank(registration.authfieldone)){
                isValidRegistration = false;
                this.errorOnField("#authfield1", "Please enter value for mandatory field.")
            }
            if(this.controller.get('model.channel.useAuthItem2') && String.isBlank(registration.authfieldtwo)){
                isValidRegistration = false;
                this.errorOnField("#authfield2", "Please enter value for mandatory field.")
            }

            if(this.controller.get('model.channel.useAuthItem3') && String.isBlank(registration.authfieldthree)){
                isValidRegistration = false;
                this.errorOnField("#authfield3", "Please enter value for mandatory field.")
            }
            if(this.controller.get('model.channel.useAuthItem4') && String.isBlank(registration.authfieldfour)){
                isValidRegistration = false;
                this.errorOnField("#authfield4", "Please enter value for mandatory field.")
            }
            if (registration.authfieldone && registration.authfieldone.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield1", maxLengthErrorMsg)
            }
            if (registration.authfieldtwo && registration.authfieldone.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield2", maxLengthErrorMsg)
            }
            if (registration.authfieldthree && registration.authfieldthree.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield3", maxLengthErrorMsg)
            }
            if (registration.authfieldfour && registration.authfieldfour.length > 255){
                isValidRegistration = false;
                this.errorOnField("#authfield4", maxLengthErrorMsg)
            }

            return isValidRegistration;
        },

        actions: {
            saveRegistration: function (registrationField, authfield1, authfield2, authfield3, authfield4, channelref1, channelref2, channelref3, channelref4, accept) {
                this.controller.set("disableSubmit", true);
                var registration = {registrationfield: registrationField, authfieldone: authfield1, authfieldtwo: authfield2,
                    authfieldthree: authfield3, authfieldfour: authfield4, channelrefone: channelref1, channelreftwo: channelref2,
                    channelrefthree: channelref3, channelreffour: channelref4, accept: accept};
                if(this.validateRegistration(registration)){
                    Ember.$.post("/data/payer/registrations/%@/mailer/%@/channels/selfservice/reckon".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer")),
                        registration)
                        .always($.proxy(function() {this.controller.set("disableSubmit", false);}, this))
                        .done($.proxy(function(response){
                            if (response.success) {
                                this.transitionTo("biller.incoming.registration", response.registration.id);
                                this.showSuccessMessage("Reckon Registration Created.")
                            }else {
                                this.controller.set("errormessage", response.errorMessage);
                                if (response.errorMessage){
                                    this.showErrorMessage("We are unable to save your registration due to validation errors. Please see top of the page for error details.");
                                    this.errorOnField("#registrationField", response.errorMessage)
                                } if (response.errorMessageTwo){
                                    this.controller.set("errormessage", response.errorMessageTwo);
                                    this.showErrorMessage(response.errorMessageTwo)
                                }
                                else {
                                    this.showErrorMessage("We are unable to save your registration. Please try again later.");
                                }

                            }
                        }, this));
                } else {
                    this.controller.set("disableSubmit", false);
                    this.showErrorMessage("We are unable to save your registration. Please see fields for errors.");
                }

            },

            refreshSuppliers: function() {
                this.controller.set("suppliersLoading", true);
                Ember.$.get("/data/payer/registrations/%@/mailer/%@/reckon/suppliers".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer")))
                    .done($.proxy(function(response){
                        if(response.success){
                            this.controller.set("model.reckonvendors", response.reckonvendors);
                            this.controller.set("suppliersLoading", false);
                        } else {
                            this.controller.set("model.reckonvendors", null);
                        }
                    }, this));
            },

            createSupplier: function(terms) {
                var self = this;
                this.startLoading();
                this.controller.set("disableSubmit", true);
                var termsvals = {supplierterms: terms};

                Ember.$.post("/data/payer/registrations/%@/mailer/%@/reckon/supplier/create".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer")), termsvals)
                    .always($.proxy(function() {this.controller.set("disableSubmit", false);}, this))
                    .done($.proxy(function(response){
                        if (response.success) {
                            this.showSuccessMessage("Reckon Supplier Created.");
                            this.controller.set("createSupplier", "incorrect");
                            self.send("refreshSuppliers");

                        }else {
                            this.showErrorMessage("We are unable to save your new supplier in Reckon. Please try again later.");
                        }
                    }, this));

                this.finishedLoading();


            },

            connectToReckon: function(reckonCountry, reckonCompanyFile, reckonApiUsername, reckonApiPassword){
                return Ember.$.get("/data/settings/reckon/%@/connecttoreckon/%@/%@".fmt(this.modelFor("biller").get("id"), this.modelFor("biller").get("currentMailer"), "registration"),
                    {reckonCountry: reckonCountry, reckonCompanyFile: reckonCompanyFile,
                     reckonApiUsername: reckonApiUsername, reckonApiPassword: reckonApiPassword})
                    .done($.proxy(function(response){
                        window.top.location.href = response.requesttoken.uri;
                    }, this));

            },
        }
    });

    App.BillerIncomingReckonController = Ember.Controller.extend(
        App.ModalProducingControllerMixin,
        App.IncomingRegistrationStringsMixin,
        App.AuthFieldMixin,
        App.FormHelperMixin, {
            application: Ember.inject.controller(),

            gstInclusiveExclusive: Ember.computed({
                get: function() {
                    return [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            amountTotalOrMinimum: Ember.computed({
                get: function() {
                    return [{id: "TOTAL", name: "Total Amount"}, {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            reckonUpdateVendor: Ember.observer("channelref1",  function(){
                if(this.get("biller.id")!= null){
                    this.set("model.supplier.terms", "Loading...");
                    Ember.$.get("/data/payer/registrations/%@/mailer/%@/reckon/supplier/%@".fmt(this.get("biller.id"), this.get("biller.currentMailer"), this.get("channelref1")))
                        .done($.proxy(function (response) {
                            if (response.success) {
                                this.set("model.supplier.terms", response.terms);
                            } else {
                                this.set("model.supplier.terms", "Unable to find Supplier");
                                this.showErrorMessage("An error occurred while trying to find the selected supplier. Please try again later.");
                            }
                        }, this));
                }

            }),

            correct: Ember.computed("createSupplier", {
                get: function() {
                    return this.get("createSupplier") === "correct";
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            incorrect: Ember.computed("createSupplier", {
                get: function () {
                    return this.get("createSupplier") === "incorrect";
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            reckonConnectionDateFormatted: Ember.computed("model", {
                get: function() {
                    return moment(this.get('model.connection.connectedDate')).format("DD MMMM YYYY H:mm");
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            disableCreateConnection: Ember.computed("reckonAPIPassword", "reckonAPIUsername", "reckonCountryFile",{
                get: function() {
                    return this.get("reckonCountryFile") == null || this.get("reckonAPIUsername") == null || this.get("reckonAPIPassword") == null;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            reckonCountries: Ember.computed({
                get: function() {
                    return [{id: "Australia", name: "Australia"}, {id: "New Zealand", name: "New Zealand"}];
                },
                set: function(key, newValue) {
                    return newValue;
                }

            }),

            disableCreateConnection: Ember.computed("reckonAPIPassword", "reckonAPIUsername", "reckonCountryFile",{
                get: function() {
                    return this.get("reckonCountryFile") == null || this.get("reckonAPIUsername") == null || this.get("reckonAPIPassword") == null;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            hasReckonConnection: Ember.computed("model", {
                get: function() {
                    if(this.get('model.connection')){
                        return true;
                    }
                    return false;
                },
                set: function (key, newvalue){
                    return newValue;
                }
            }),

            hasReckonVendors: Ember.computed("model", {
                get: function() {
                    if(this.get("model.reckonvendors").toArray().length == 0){
                        return false;
                    }
                    return true;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            hasReckonSuppliers: Ember.computed("model", {
                get: function() {
                    if(this.get("model.reckonvendors").toArray().length == 0){
                        return false;
                    }
                    return true;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),


            hasReckonAccounts: Ember.computed("model", {
                get: function() {
                    if(this.get("model.reckonaccounts").toArray().length == 0){
                        return false;
                    }
                    return true;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            hasReckonTaxCodes: Ember.computed("model", {
                get: function() {
                    if(this.get("model.reckontaxcodes").toArray().length == 0){
                        return false;
                    }
                    return true;
                },
                set: function(key, newValue) {
                    return newValue;
                }
            }),

            actions:{
                markedAsChanged : function(value){
                    this.set("createSupplier", value);
                },
            },

        });

        Ember.TEMPLATES['biller/incoming/importfromtext'] = Ember.Handlebars.compile(importFromTextTemplate);
        App.BillerIncomingImportfromtextRoute =  App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin , App.FormHelperMixin, {

            model: function(params){
                return Ember.$.get("/data/payer/registrations/%@/mailer/%@/channels/selfservice/mybillsagent".fmt(this.modelFor("biller").get("id"),  params.mailerId));

            },
            setupController: function (controller, model) {
                this._super(controller, model);
                controller.set("biller", this.modelFor("biller"));
                controller.set("registrations", null);
                var placeholderText = '';
                for(var i = 0 ; i < 15; i++){
                    if (model.channel.useAuthItem1) {
                        placeholderText += model.channel.registrationContactIdField + "...                       " + model.channel.authItem1Field + "...     "
                    } else {
                        placeholderText += model.channel.registrationContactIdField + "...                       "
                    }
                    if(i != 14){
                        placeholderText += "\n";
                    }
                }
                controller.set("placeholder", placeholderText);
                controller.set("mailerId", this.modelFor("biller").get("currentMailer"));
                controller.set("model", model);
            },

            actions: {

                back: function(){
                    if(this.modelFor("biller").get("currentAuthorisation")){
                        this.transitionTo("biller.import");
                    } else {
                        this.transitionTo("biller.incoming.mybillsagent", this.controller.get("mailerId"));
                    }
                },

                importCopyPaste: function(registrations){
                    var isBillerLoadingRegistrations = this.modelFor("biller").get("id") === this.modelFor("biller").get("currentMailer");

                    if(this.controller.get("placeholder") === this.controller.get("registrations")){
                        this.showErrorMessage(this.controller.get("strings.importText.noRegos"));
                    } else {
                        var billerId = this.modelFor("biller").get("id");
                        if(isBillerLoadingRegistrations){
                            billerId = this.modelFor("biller").get("currentAuthorisation");
                        }
                        Ember.$.post("/data/payer/registrations/%@/mailer/%@/bulk/import/%@".fmt(billerId, this.modelFor("biller").get("currentMailer"), isBillerLoadingRegistrations),
                            {registrations: registrations})
                            .done($.proxy(function(response){
                                if (response.success) {
                                    this.showSuccessMessage(this.controller.get("strings.importText.successMessage"));
                                    if(isBillerLoadingRegistrations){
                                        this.transitionTo("biller.import");
                                    } else {
                                        this.transitionTo("biller.incoming.mybillsagent", this.modelFor("biller").get("currentMailer"));
                                    }
                                }else {
                                    this.showErrorMessage(this.controller.get("strings.importText.errorMessage"));
                                }
                            }, this));
                    }
                }

            }
        });

        App.BillerIncomingImportfromtextController = Ember.Controller.extend(
            App.ModalProducingControllerMixin,
            App.IncomingRegistrationStringsMixin,
            App.FormHelperMixin, {
                application: Ember.inject.controller(),
                strings: translations.all,

            });


        App.BillerIncomingRegistrationRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, App.IncomingRegistrationsValidation, {
            model: function(params) {
                return this._getRegistration(params.registrationId);
            },

            _getRegistration: function(id) {
                return Ember.$.get("/data/payerregistrations/%@".fmt(id));
            },

            setupController: function(controller, model) {

                this._super(controller, model);
                this.controller.set("biller", this.modelFor("biller"));
                this.controller.set('model', model.payerregistration);

                this.controller.set("errorsemail", null);
                this.controller.set("model.updateerror", null);
                this.controller.set("deleteddetails", []);
            },

            validateRegistration: function(registration){
                this.controller.set("model.updateerror", null);
                this.controller.set("errorsemail", null);

                var isValidRegistration = true;

                var hasBlankEmailRego = false;
                var hasUnacceptedEmailRego = false;
                $.each(registration.details,
                    function(idx, tf) {
                        if(String.isBlank(tf.registrationValue)){
                            isValidRegistration = false;
                            hasBlankEmailRego = true;
                        };

                        if(tf.id === undefined && (tf.accept === undefined || tf.accept == false)){
                            isValidRegistration = false;
                            hasUnacceptedEmailRego = true;
                        }
                    });

                if (hasBlankEmailRego && hasUnacceptedEmailRego){
                    this.controller.set("model.updateerror", "Please ensure all emails are entered and confirmed below.");
                } else if(hasBlankEmailRego){
                    this.controller.set("model.updateerror", "Please ensure all emails are entered below.");
                } else if(hasUnacceptedEmailRego){
                    this.controller.set("model.updateerror", "Please ensure all emails are confirmed below.");
                }


                return isValidRegistration;
            },

            actions: {

                refresh: function(id){
                    this.startLoading();
                    this.doRemoteAction(function () {
                            return this._getRegistration(id);
                        },
                        function (results) {
                            this.controller.set("model", results.payerregistration);
                        },
                        "Could not refresh mail details. Please try again later.");
                    this.finishedLoading();
                },

                backToRegistrations: function(){
                    window.location.href = "portal/customer/biller/" + this.modelFor("biller").get("id") + "/registrations/billers/" + this.controller.get('model').billerActorId
                },

                deregister: function(id){
                    this.doRemoteAction(function() {
                            return $.post("/data/payer/registrations/%@/mailer/%@/channel/selfservice/deregister/%@".fmt(this.modelFor("biller").get("id"),
                                this.controller.get('model').billerActorId, id));
                        },
                        function(results) {
                            this.showSuccessMessage("De-registration successful.");
                            //this.controller.set("model", results);
                            //this.controller.set("meta", results.get("meta"));
                            this.send("refresh", id);

                        },
                        "An error occurred while deregistering the registration. Please try again later.");
                },

                update: function(id, channelref1, channelref2, channelref3, channelref4, details){
                    this.startLoading();

                    var registration = {
                        id: id,
                        channelref1: channelref1,
                        channelref2: channelref2,
                        channelref3: channelref3,
                        channelref4: channelref4,
                        details: details,
                        deleteddetails: this.controller.get("deleteddetails")
                    };

                    if (this.validateRegistration(registration)) {
                        Ember.$.post("/data/payerregistrations", registration)
                            .always($.proxy(this.finishedLoading, this))
                            .done($.proxy(function (response) {
                                if (response.success) {
                                    this.showSuccessMessage("Registration updated successfully")
                                    this.send("refresh", id);
                                }
                                else {
                                    if(response.message){
                                        this.controller.set("errorsemail", response.message);
                                        this.controller.set("model.updateerror", "Please correct the invalid emails below:");
                                        this.showErrorMessage("The email addresses could not be updated due to an invalid email address. Please see error message above emails.");
                                    } else if (response.error){
                                        this.controller.set("model.updateerror", response.error);
                                        this.showErrorMessage("The email addresses could not be updated due to an invalid email address. Please see error message above emails.");

                                    } else {
                                        this.showErrorMessage("An error occurred while updating the registration. Please try again later.");
                                    }
                                }
                            }, this))
                            .fail($.proxy(function () {
                                this.showErrorMessage("An error occurred while attempting to save your registration. Please try again later.");
                            }, this));
                    } else {
                        this.finishedLoading();
                        this.showErrorMessage("We are unable to save your registration. Please see fields for errors.");
                    }
                },

                resendEmailVerification: function(id){
                    Ember.$.post("/data/payerregistrations/resend", {"id": id})
                        .always($.proxy(this.finishedLoading, this))
                        .done($.proxy(function (response) {
                            if (response.success) {
                                this.showSuccessMessage("Confirmation email resent successfully");
                            }
                            else {
                                if(response.error) {
                                    this.showErrorMessage(response.error);
                                } else {
                                    this.showErrorMessage("An error occurred while attempting to resend your confirmation email. Please try again later.");
                                }
                            }
                        }, this))
                        .fail($.proxy(function () {
                            this.showErrorMessage("An error occurred while attempting to resend your confirmation email. Please try again later.");
                        }, this));
                },

                addEmail: function(){
                    this.controller.set("model.updateerror", null);
                    if(this.controller.get("model.details").length < this.controller.get("model.maxNoDetails")) {
                        this.controller.get("model.details").pushObject({"registrationValue": null});
                    } else {
                        this.controller.set("model.updateerror", "You have reached the maximum number of emails ("+this.controller.get("model.maxNoDetails")+") for a registration.");
                        this.showErrorMessage("You have reached the maximum number of emails ("+this.controller.get("model.maxNoDetails")+") for a registration.");
                    }
                },

                removeEmail: function(email){
                    //Add modal
                    this.controller.set("model.updateerror", null);
                    var activeEmailsCount = 0;

                    if(typeof email.status !== "undefined" && email.status == 0){
                        $.each(this.controller.get("model.details"),
                            function(idx, tf) {
                                if(tf.status == 0){
                                    activeEmailsCount += 1;
                                };
                            });
                    }

                    if(activeEmailsCount == 1){
                        //if the email is the last active one don't allow it to be deleted!
                        this.controller.set("model.updateerror", "The selected email cannot be deleted. At least one active email is required for a registration.  ");
                    } else {
                        if(typeof email.id !== "undefined") {
                            this.controller.get("deleteddetails").pushObject(email);
                        }
                        this.controller.get("model.details").removeObject(email);
                    }
                }
            },

        });

        Ember.TEMPLATES['biller/incoming/registration'] = Ember.Handlebars.compile(incomingRegistrationTemplate);

        Ember.TEMPLATES['confirm-deregister'] = Ember.Handlebars.compile(confirmDeregistrationModal);

        App.ConfirmDeregisterMixin = Ember.Mixin.create({
            application: Ember.inject.controller(),
            strings: translations.all,

        });

        App.BillerIncomingRegistrationController = Ember.Controller.extend(App.RegistrationStringsMixin,
            App.RegistrationsDisplayFieldMixin,
            App.ModalProducingControllerMixin,
            App.ConfirmDeregisterMixin, {
                application:Ember.inject.controller(),
                payerregistrations:Ember.inject.controller(),


                getMeta : function(){
                    return this.get("registrations.meta");
                },

                gstInclusiveExclusive: Ember.computed({
                    get: function() {
                        return [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}, {id: "NoTax", name: "NoTax"}];
                    }

                }),

                gstInclusiveExclusiveMyob: Ember.computed({
                    get: function() {
                        return [{id: "Inclusive", name: "Inclusive"}, {id: "Exclusive", name: "Exclusive"}];
                    }

                }),

                amountTotalOrMinimum: Ember.computed({
                    get: function() {
                        return [{id: "TOTAL", name: "Total Amount"}, {id: "MINIMUM", name: "Minimum Amount/Installment Amount"}];
                    }

                }),

                invoiceStatus: Ember.computed({
                    get: function() {
                        return [{id: "DRAFT", name: "DRAFT"}, {id: "AUTHORISED", name: "AUTHORISED"}, {id: "SUBMITTED", name: "SUBMITTED"}];
                    }

                }),

                channelPartnerSystemDisplay: Ember.computed("model", {
                    get: function() {
                        var mapping = this.get("strings.channels");
                        return mapping[this.get("model").channelPartnerSystemId];
                    }
                }),

                statusDescription: Ember.computed("model", {
                    get: function() {
                        var statusDescription = this.get("strings.statusDescription");
                        return statusDescription[this.get("model.deactivatedReason")];
                    }
                }),

                createdDateFormatted: Ember.computed("model", {
                    get: function() {
                        var dateTimeFormat = "DD MMM YYYY hh:mm:ss a";
                        return moment(this.get("model.createdDate")).format(dateTimeFormat);
                    }
                }),

                deactivatedDateFormatted: Ember.computed("model", {
                    get: function() {
                        var dateTimeFormat = "DD MMM YYYY hh:mm:ss a";
                        return moment(this.get("model.deactivatedDate")).format(dateTimeFormat);
                    }
                }),

                hasXeroAccounts: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.xeroaccounts").toArray().length == 0){
                            return false;
                        }
                        return true;
                    }
                }),

                hasMyobBusinesses: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.myobaccounts").toArray().length == 0){
                            return false;
                        }
                        return true;
                    }
                }),

                hasReckonVendors: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.reckonvendors").toArray().length == 0){
                            return false;
                        }
                        return true;
                    }
                }),

                hasReckonTaxCodes: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.reckontaxcodes").toArray().length == 0){
                            return false;
                        }
                        return true;
                    }
                }),

                hasReckonAccounts: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.reckonaccounts").toArray().length == 0){
                            return false;
                        }
                        return true;
                    }
                }),

                reckonUpdateVendor: Ember.observer("model.channelRef1",  function(){
                    if(this.get("biller.id")!= null && this.get("model.isReckon")){
                        this.set("model.supplier.terms", "Loading...");
                        Ember.$.get("/data/payer/registrations/%@/mailer/%@/reckon/supplier/%@".fmt(this.get("biller.id"), "1", this.get("model.channelRef1")))
                            .done($.proxy(function (response) {
                                if (response.success) {
                                    this.set("model.supplier.terms", response.terms);
                                } else {
                                    this.set("model.supplier.terms", "Unable to find Supplier");
                                    this.showErrorMessage("An error occurred while trying to find the selected supplier. Please try again later.");
                                }
                            }, this));
                    }

                }),

                enableUpdateButton: Ember.computed("model", {
                    get: function() {
                        var canUpdate = false;
                        if(this.get("model.status") === "pending" || this.get("model.status") === "active" ){
                            canUpdate = true;
                        }
                        if(this.get("model.isXero") && this.get("model.xeroaccounts").toArray().length == 0){
                            canUpdate = false;
                        }
                        if(this.get("model.isMyob") && this.get("model.myobaccounts").toArray().length == 0){
                            canUpdate = false;
                        }
                        return canUpdate;
                    }
                }),

                showDeregisterButton: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.status") === "pending" || this.get("model.status") === "active" ){
                            return true;
                        }
                        return false;
                    }
                }),

                showDeregistedAndFailed: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.status") === "failed" || this.get("model.status") === "deregistered" ){
                            return true;
                        }
                        return false;
                    }
                }),

                showNotDeregistedAndFailed: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.status") === "failed" || this.get("model.status") === "deregistered" ){
                            return false;
                        }
                        return true;
                    }
                }),


                showAuthItem1: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.authItem1Field") === null || this.get('model.useAuthItem1') == false){
                            return false;
                        }
                        return true;
                    }
                }),

                showAuthItem2: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.authItem2Field") === null || this.get('model.useAuthItem2') == false){
                            return false;
                        }
                        return true;
                    }
                }),

                showAuthItem3: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.authItem3Field") === null || this.get('model.useAuthItem3') == false){
                            return false;
                        }
                        return true;
                    }
                }),

                showAuthItem4: Ember.computed("model", {
                    get: function() {
                        if(this.get("model.authItem4Field") === null || this.get('model.useAuthItem4') == false){
                            return false;
                        }
                        return true;
                    }
                }),

                deregisterConfirmActionButtons: [App.ModelDialogActionButton.create({label: translations.all.deregModalCancel, actionName: "cancel", bsType: "btn-link"}),
                    App.ModelDialogActionButton.create({label: translations.all.deregModalSubmit, bsType: "btn-danger", actionName: "confirm"})],

                actions: {
                    promptDeregister: function () {
                        this.showModal("confirm-deregister");
                    },

                    confirmDeregister: function () {
                        this.send("deregister", this.get("model.id"));
                    }
                }
            });

    });
