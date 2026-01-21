define(['i18n!nls/globals',
        'text!templates/account-email-update-confirmation.html',
    'application', 'emberdata', 'form-helper', 'login'], function(translations, accountEmailUpdate) {

    App.Router.map(function(){
        this.route("account-email-update", {path: '/account-email-update/:code/:id'});
    });

    App.AccountEmailUpdateRoute = Ember.Route.extend(App.RouteWithRemoteActionsMixin, {
        model: function(params) {
            return Ember.$.get("/auth/account-email-update-confirmation", {code: params.code, id: params.id});
        },

        afterModel: function(model) {
            if (!model.invite) {
                window.location.href = "/portal/customer/login";
            }
        },

        actions: {
            confirm: function(invite) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/account-email-update-confirmation/confirm", {id: invite.id,
                            code: invite.code});
                    },
                    function(resp) {
                        if (resp.success) {
                            window.location.href = "/verify/email-update-confirmation";
                        } else {
                            if(resp.error){
                                this.showErrorMessage(this.controller.get("strings.accountEmailUpdate.errors")[resp.error]);
                            } else {
                                this.showErrorMessage(this.controller.get("strings.accountEmailUpdate.updateErrorMessage"));
                            }
                        }
                    },
                    this.controller.get("strings.accountEmailUpdate.updateFailMessage"));
            },
            cancel: function(invite) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/account-email-update-confirmation/cancel", {id: invite.id,
                            code: invite.code});
                    },
                    function(resp) {
                        if (resp.success) {
                            window.location.href = "/portal/customer/login";
                        } else {
                            this.showErrorMessage(this.controller.get("strings.accountEmailUpdate.cancelErrorMessage"));
                        }
                    },
                    this.showErrorMessage(this.controller.get("strings.accountEmailUpdate.cancelFailMessage")));
            }
        }
    });

    Ember.TEMPLATES['account-email-update'] = Ember.Handlebars.compile(accountEmailUpdate);
    App.AccountEmailUpdateController = Ember.Controller.extend(App.FormHelperMixin,{
        application:Ember.inject.controller(),
        strings: translations.all,

        text: Ember.computed({
            get: function () {
                return this.get("strings.accountEmailUpdate.text").fmt(this.get("model").invite.newEmail);
            }
        }),

        inviteError: Ember.computed({
           get: function() {
               return this.get("strings.accountEmailUpdate.errors")[this.get("model").invite.error];
           }
        }),

        actions: {
            confirmEmailUpdate: function() {

                this.send("confirm",
                    this.get("model").invite);

            },
            cancelEmailUpdate: function() {

                this.send("cancel",
                    this.get("model").invite);

            }
        }
    });


});
