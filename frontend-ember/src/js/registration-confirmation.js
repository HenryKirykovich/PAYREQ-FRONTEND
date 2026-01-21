define(['i18n!nls/login',
    'text!templates/registration-confirmation.html',
    'text!templates/registration-existingconfirmation.html',
    'text!templates/registration-verifyconfirmation.html',
    'application', 'emberdata', 'form-helper', 'login'], function(translations,
                                                                            registrationConfirmationTemplate,
                                                                            registrationExistingConfirmationTemplate,
                                                                            registrationVerifyConfirmationTemplate) {

    App.Router.map(function(){
        this.route("registration", function() {
            this.route("confirmation");
            this.route("existingconfirmation");
            this.route("verifyconfirmation");
        });
    });

    Ember.TEMPLATES['registration/confirmation'] = Ember.Handlebars.compile(registrationConfirmationTemplate);

    App.RegistrationConfirmationRoute = App.BaseRoute.extend(App.LoadingAlertRouteMixin,
        App.ApplicationMessageProducingRouteMixin, App.FormHelperMixin, {

            beforeModel: function() {
                this.controllerFor("application").set("registrationerrors", null);
            },

            model: function() {
                return Ember.$.get("/auth/resend-email");
            },

            setupController: function(controller, model) {
                this._super(controller, model);
                controller.set("model", model);
            },

            actions: {
                verify: function (username, verificationCode) {
                    this.startLoading();
                    var self = this;

                    Ember.$.post("/auth/verify", {username: username, code: verificationCode, fingerprint: App.fingerprint})
                        .always($.proxy(self.finishedLoading, self))
                        .done($.proxy(function (response) {

                            if (response.success) {
                                self.controllerFor("application").setUserContext(response.context);
                                window.location.href = "/portal/customer/login";
                            } else {
                                if (response.error) {
                                    self.errorOnField("#verificationCode", this.controller.get("strings.deviceLogin.errors")[response.error]);
                                } else {
                                    self.showErrorMessage(this.controller.get("strings.deviceLogin.errorMessage"));
                                }
                            }
                        }, this))
                        .fail($.proxy(function () {
                            self.showErrorMessage(this.controller.get("strings.deviceLogin.errorMessage"));
                        }, self));
                },
                resendEmail: function(username, companyId){
                    this.startLoading();

                    Ember.$.post("/auth/resend-email")
                        .always($.proxy(this.finishedLoading, this))
                        .done($.proxy(function(response){
                            if (response.success) {
                                this.controller.set("model.maxerror", false);
                                this.controller.set("model.error", false);
                                this.controller.set("model.resent", response.success);
                            } else {
                                this.controller.set("model.resent", false);
                                if(response.error){
                                    this.controller.set("model.maxerror", true);
                                }else {
                                    this.controller.set("model.error", true);
                                }
                            }
                        }, this))
                        .fail($.proxy(function() {
                            this.showErrorMessage(this.controller.get("strings.verifyAccount.failMessage"));
                        }, this));
                },
            },

        });

    App.RegistrationConfirmationController = Ember.Controller.extend({
        application:Ember.inject.controller(),
        strings: translations,

        resentMessage: Ember.computed("model", {
            get: function() {
                return this.get("strings.verifyAccount.resentMessage").fmt(this.get("model").username);
            }
        }),

        errorMessage: Ember.computed("model", {
            get: function() {
                return this.get("strings.verifyAccount.errorMessage").fmt(this.get("model").username);
            }
        }),
    });

    Ember.TEMPLATES['registration/existingconfirmation'] = Ember.Handlebars.compile(registrationExistingConfirmationTemplate);
    App.RegistrationExistingconfirmationController = Ember.Controller.extend({
        application: Ember.inject.controller(),
        strings: translations,
    });

    Ember.TEMPLATES['registration/verifyconfirmation'] = Ember.Handlebars.compile(registrationVerifyConfirmationTemplate);

    App.RegistrationVerifyconfirmationController = Ember.Controller.extend({
        application: Ember.inject.controller(),
        strings: translations,
    });

});
