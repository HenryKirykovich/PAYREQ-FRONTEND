define(['i18n!nls/login',
        'text!templates/payer-error.html',
        'application', 'form-helper'],
    function(loginStrings, payerErrorTemplate) {

        App.Router.map(function(){
            //redirecting for biller that have this old URL eg. Dungog
            this.route("payerlogin", {path: '/payerlogin'});

            this.route("payer", function() {
                this.route("registration"); //keep this as it's redirecting for biller that have the old sign up URL
                this.route("error");
            });
        });


        //redirecting for biller that have this old URL eg. Dungog
        App.PayerloginRoute = App.BaseRoute.extend(App.LoadingAlertRouteMixin,
            App.ApplicationMessageProducingRouteMixin, {

                beforeModel: function() {
                    if (this.controllerFor("application").get("isLoggedIn")) {
                        window.location.href = "/portal/customer/login";
                    }

                    this.transitionTo("login");
                }

        });

        App.PayerRegistrationRoute = App.BaseRoute.extend(App.LoadingAlertRouteMixin,
            App.ApplicationMessageProducingRouteMixin, {

                //redirecting for billers that have the old page
                beforeModel: function() {
                    window.location.href = "/portal/sign-up";
                },

            });


        Ember.TEMPLATES['payer/error'] = Ember.Handlebars.compile(payerErrorTemplate);

        App.PayerErrorController = Ember.Controller.extend({
           strings: loginStrings,
        });
    });
