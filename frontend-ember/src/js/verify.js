define(['i18n!nls/globals',
        'text!templates/verify.html',
        'application', 'emberdata', 'form-helper', 'login'],
    function(globalStrings, verifyTemplate) {

    App.Router.map(function(){
        this.route("verify", {path: '/verify/:code/:id'});
    });

    App.VerifyRoute = Ember.Route.extend(App.RouteWithRemoteActionsMixin, {
        model: function(params) {
            return Ember.$.get("/auth/verify", {code: params.code, userId: params.id});
        },

        afterModel: function(model) {
            if (!model.invite) {
                window.location.href = "/portal/customer/login";
            }
        },

        actions: {
            addUser: function(invite, uid, name) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/verify", {userId: invite.id,
                            code: invite.inviteCode,
                            uid: uid,
                            name: name,
                            fingerprint: App.fingerprint});
                    },
                    function(resp) {
                        if (resp.success) {
                            this.transitionTo("registration.verifyconfirmation");
                        } else {
                            this.showErrorMessage(this.controller.get("strings.verify.errorResp"));
                        }
                    },
                    this.controller.get("strings.verify.errorMessage"));
            }
        }
    });

    Ember.TEMPLATES['verify'] = Ember.Handlebars.compile(verifyTemplate);
    App.VerifyController = Ember.Controller.extend({
        application:Ember.inject.controller(),

        strings: globalStrings.all,

        actions: {
            verifyAndAddUser: function() {

                this.send("addUser",
                    this.get("model").invite,
                    this.get("model").invite.email,
                    this.get("model").invite.name);

            }
        }
    });


});
