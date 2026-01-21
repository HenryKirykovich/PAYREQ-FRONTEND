define(['i18n!nls/login',
    'text!templates/agent-consent.html',
    'application', 'emberdata', 'form-helper', 'login'],
    function(translation, agentConsentTemplate) {

    App.Router.map(function(){
        this.route("agent-authorisation", {path: '/agent-authorisation/:code/:id'});
    });

    App.AgentAuthorisationRoute = Ember.Route.extend(App.RouteWithRemoteActionsMixin, {
        model: function(params) {
            return Ember.$.get("/auth/agent-authorisation", {code: params.code, id: params.id});
        },

        afterModel: function(model) {
            if (!model.invite) {
                window.location.href = "/portal/customer/login";
            }
        },

        actions: {
            checkPassword: function(invite, password, mfacode) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/agent-authorisation/password", {id: invite.id,
                            code: invite.code, password: password, token: mfacode});
                    },
                    function(resp) {
                        if (resp.success) {
                            this.controller.set("model", resp);
                            if(resp.invite.accounts.length > 0){
                                this.controller.set("account", resp.invite.accounts[0].id);
                            }
                        } else {
                            if (resp.message){
                                this.showErrorMessage(this.controller.get("strings.agentConsent.errors")[resp.message]);
                            } else {
                                this.showErrorMessage(this.controller.get("strings.agentConsent.verifyError").fmt(invite.billerName));
                            }
                        }
                    },
                    this.controller.get("strings.agentConsent.verifyFail"));
            },

            authorise: function(invite, account) {
                this.doRemoteAction(function() {
                        return Ember.$.post("/auth/agent-authorisation/authorise", {id: invite.id,
                            code: invite.code, account: account});
                    },
                    function(resp) {
                        if (resp.success) {
                            this.showSuccessMessage(this.controller.get("strings.agentConsent.success"))
                            window.location.href = "/portal/customer/login";
                        } else {
                            if (resp.message) {
                                if(resp.message === "existing.auth"){
                                    this.showErrorMessage(this.controller.get("strings.agentConsent.errors")[resp.message].fmt(invite.billerName))
                                } else {
                                    this.showErrorMessage(this.controller.get("strings.agentConsent.errors")[resp.message]);
                                }
                            } else {
                                this.showErrorMessage(this.controller.get("strings.agentConsent.authoriseError").fmt(invite.billerName));
                            }
                        }
                    },
                    this.controller.get("strings.agentConsent.authoriseFail"));
            },
        }
    });

    Ember.TEMPLATES['agent-authorisation'] = Ember.Handlebars.compile(agentConsentTemplate);
    App.AgentAuthorisationController = Ember.Controller.extend({
        application:Ember.inject.controller(),
        strings: translation,

        textLine1: Ember.computed("model", {
            get: function() {
                return this.get("strings.agentConsent.textLine1").fmt(this.get("model").invite.billerName);
            }
        }),

        textLine2: Ember.computed("model", {
            get: function() {
                return this.get("strings.agentConsent.textLine2").fmt(this.get("model").invite.billerName);
            }
        }),

        loginLine1: Ember.computed("model", {
            get: function() {
                return this.get("strings.agentConsent.loginLine1").fmt(this.get("model").invite.billerName);
            }
        }),

        loginLine2: Ember.computed("model", {
            get: function() {
                return this.get("strings.agentConsent.loginLine2").fmt(this.get("model").invite.uid);
            }
        }),

        actions: {
            confirmPassword: function(password, mfacode) {

                this.send("checkPassword",
                    this.get("model").invite,
                    password, mfacode);

            },

            authoriseAccount: function(account) {

                this.send("authorise",
                    this.get("model").invite,
                    account);

            },

        }
    });


});
