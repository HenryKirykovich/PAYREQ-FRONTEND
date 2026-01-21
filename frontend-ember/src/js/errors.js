define(['i18n!nls/errors',
	'text!templates/connection-error.html',
	'application', 'emberdata', 'billers', 'moment'],
	function(errorsTranslations, connectionErrorsTemplate) {


    App.BillerErrorsRoute = App.BaseBillerRoute.extend({

        model: function(params) {
            return params;
        },

    });


    Ember.TEMPLATES['biller/errors'] = Ember.Handlebars.compile(connectionErrorsTemplate);
    App.BillerErrorsController = Ember.Controller.extend({

        strings: errorsTranslations,

        title: Ember.computed("model", "strings", {
            get: function () {
                return this.get("strings.connection.title").fmt(this.get("model").channel);
            }
        }),

        text: Ember.computed("model", "strings", {
            get: function () {
                return this.get("strings.connection.text").fmt(this.get("model").channel);
            }
        })
    });
});