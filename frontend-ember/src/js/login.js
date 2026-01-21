define(['i18n!nls/login',
        'text!templates/quickbooks-error.html',
        'application', 'form-helper'],
    function (strings, quickbooksErrorTemplate) {

        App.Router.map(function () {
            this.route("login", {path: '/login'});

            this.route("quickbooks", function () {
                this.route("error");
            });
        });

        App.LoginRoute = App.BaseRoute.extend({
            //required to redirect old login path
            beforeModel: function () {
                window.location.href = "/portal/customer/login";
            }
        });

        App.AuthedRouteMixin = Ember.Mixin.create({
            //required to redirect old login path
            beforeModel: function (transition) {
                if (!this.controllerFor("application").get("isLoggedIn")) {
                    sessionStorage.setItem('previousPath', '/customer#' +  transition.intent.url);
                    window.location.href = "/portal/customer/login";
                    return false;
                } else return true;
            }
        });

        Ember.TEMPLATES['quickbooks/error'] = Ember.Handlebars.compile(quickbooksErrorTemplate);


        App.QuickbooksErrorRoute = App.BaseRoute.extend(App.LoadingAlertRouteMixin, App.ApplicationMessageProducingRouteMixin, {

            requestSetupUrl: function () {
                return App.payreqConfig.qboPayroll.authSetupRequestUrl;
            },

            actions: {
                backTologin: function () {
                    window.location.href = "/portal/customer/login";
                }
            }
        });

        App.QuickbooksErrorController = Ember.Controller.extend({
           strings: strings,
        });

    });
