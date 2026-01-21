define(['i18n!nls/login',
    'text!templates/email-unsubscribe.html',
    'application', 'emberdata', 'form-helper', 'login'],
    function(translation, emailUnsubscribeTemplate) {

    App.Router.map(function(){
        this.route("email-unsubscribe", {path: '/email-unsubscribe/:code/:id'});
    });

    App.EmailUnsubscribeRoute = Ember.Route.extend(App.RouteWithRemoteActionsMixin, {
        model: function(params) {
            return Ember.$.get("/auth/email-unsubscribe", {code: params.code, detailId: params.id});
        },

        afterModel: function(model) {
            if (!model.invite) {
                window.location.href = "/";
            }
        },

        actions: {
            confirm: function(invite) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/email-unsubscribe", {detailId: invite.id,
                            code: invite.verificationCode});
                    },
                    function(resp) {
                        if (resp.success) {
                            this.transitionTo("registration.unsubscribeconfirmation");
                        } else {
                            this.showErrorMessage(this.controller.get("strings.emailUnsubscribe.confirmError"));
                        }
                    },
                    this.controller.get("strings.emailUnsubscribe.confirmFail"));
            }
        }
    });

    Ember.TEMPLATES['email-unsubscribe'] = Ember.Handlebars.compile(emailUnsubscribeTemplate);
    App.EmailUnsubscribeController = Ember.Controller.extend(App.FormHelperMixin, {
        application:Ember.inject.controller(),
        strings: translation,
        actions: {
            unsubscribe: function() {

                this.send("confirm",
                    this.get("model").invite,
                    this.get("model").invite.email,
                    this.get("model").invite.name);

            }
        }
    });


});
