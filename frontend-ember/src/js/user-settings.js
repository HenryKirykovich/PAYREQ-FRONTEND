define(['i18n!nls/user-settings',
        'i18n!nls/globals',
        'i18n!nls/bills',
        'i18n!nls/login',
        'i18n!nls/settings',
		'text!templates/user-settings-notifications.html',
    	'text!templates/user-settings-organisations-add.html',
				'application',
				'form-helper',
    			'tabular-data-helper',
				'login'], function(translations, globalStrings, billStrings, loginStrings,
                                   settingsStrings,
                                   notificationsTemplate, organisationsAddTemplate) {

	App.Router.map(function() {
		this.route("user", function() {
			this.route("notifications");
			this.route("personal");
			this.route("organisations", function(){
				this.route("add");
			})
		});
	});

	Ember.TEMPLATES['user/notifications'] = Ember.Handlebars.compile(notificationsTemplate);
    Ember.TEMPLATES['user/organisations/add'] = Ember.Handlebars.compile(organisationsAddTemplate);


  App.UserSettingsStringsMixin = Ember.Mixin.create({
    strings: Ember.computed("biller.channelPartnerSystemId", "biller.extBillerId", "biller.masterBiller", {
      get: function () {
        var extBillerId = null;
        if(this.get("biller.masterBiller")){
          extBillerId = this.get("biller.masterBiller").extBillerId;
        }else{
          extBillerId = this.get("biller.extBillerId");
        }
        return App.StringsMap.create({
          baseMap: translations,
          classifier: this.get("biller.channelPartnerSystemId"),
          classifier2: this.get("biller.channelPartnerSystemId")+"-"+extBillerId
        });
      },
      set: function (key, newValue) {
        return newValue;
      }
    })
  });

	App.UserNotificationsRoute = Ember.Route.extend(App.AuthedRouteMixin,
																									App.RouteWithRemoteActionsMixin,{
		model: function() {
			return Ember.$.get("/data/settings/notification-prefs");
		},

		setupController: function (controller, model) {
      this._super(controller, model);
      controller.set("biller", this.modelFor("biller"));

      model.settings.forEach(function (setting){
        Ember.set(setting, "displayDescription", controller.get("strings.notificationPreferenceDescription")[setting.name]);
      });
    },

		actions: {
			update: function(settings) {
				this.doRemoteAction(function() {
				  for(var i =0; i<settings.length; i++){
            var setting = settings[i];
            if(!setting.alertType){
              Ember.set(setting, "alertType", "email");
            }
            if(!setting.alertFreq){
              Ember.set(setting, "alertFreq", "never");
            }
          }
					return Ember.$.post("/data/settings/notification-prefs", {notificationPrefs: settings});
				},
				function(results) {
					this.showSuccessMessage(settingsStrings.all.userSettings.notificationUpdateSuccessMessage);
				},
				"An error occurred while updating notification settings. Please try again later.");
			}
		},
	});

	App.UserNotificationsController = Ember.Controller.extend(App.FormHelperMixin,
	                                                          App.UserSettingsStringsMixin, {
	    userSettingsStrings: translations,
	    settingsStrings: settingsStrings,
	    globalStrings: globalStrings,
		frequencies: Ember.computed({
      get: function() {
  			return [
                {id: "never", name: settingsStrings.all.userSettings.notificationPreferenceValues.never},
                {id: "immediate", name: settingsStrings.all.userSettings.notificationPreferenceValues.immediate},
                {id: "frequent", name: settingsStrings.all.userSettings.notificationPreferenceValues.frequent},
                {id: "infrequent", name: settingsStrings.all.userSettings.notificationPreferenceValues.infrequent}];
      },
      set: function(key, newValue) {
        return newValue;
      }

		}),
		alertTypes: Ember.computed({
      get: function() {
  			return [{id: "email", name: settingsStrings.all.userSettings.alertTypes.email}];
      },
      set: function(key, newValue) {
        return newValue;
      }

		}),
	});

    App.UserOrganisationsAddRoute = App.BaseRoute.extend(App.LoadingAlertRouteMixin, App.ApplicationMessageProducingRouteMixin,
        													App.FormHelperMixin, {

			setupController: function(controller, model) {
				this._super(controller, model);
				this.controller.set('markedAs', 'correct');
			},

			validateOrganisation: function(organisation){
				this.removeErrors("#add-org-form");

				var isValidOrganisation = true;

				if(String.isBlank(organisation.orgName)){
                    isValidOrganisation = false;
					this.errorOnField("#orgName", this.controller.get("addAcctStrings.missingName"))
				}

                if(organisation.orgName && organisation.orgName.length > 255){
                    isValidOrganisation = false;
                    this.errorOnField("#orgName", this.controller.get("addAcctStrings.maxName"))
                }


				return isValidOrganisation;
			},

            actions: {
                addOrg: function(orgName, markedAs) {
                    var organisation = {orgName: orgName, isCompany: markedAs};
                    if (this.validateOrganisation( organisation)) {
                        this.startLoading();
                        Ember.$.post("/data/settings/onboarding/add/incoming-organisation", organisation)
                            .always($.proxy(this.finishedLoading, this))
                            .done($.proxy(function (response) {
                                if (response.success) {
                                    window.location.href = "/portal/customer/login";
                                }
                                else {
                                    if (response.error) {
                                        this.showErrorMessage(response.error);
                                    } else {
                                        this.showErrorMessage(this.controller.get("addAcctStrings.addErrorResp"));
                                    }
                                }
                            }, this))
                            .fail($.proxy(function () {
                                this.showErrorMessage(this.controller.get("addAcctStrings.addFailResp"));
                            }, this));
                    } else {
                    	this.showErrorMessage(this.controller.get("addAcctStrings.addErrorMessage"))
					}
                },
            },

        });

    App.UserOrganisationsAddController = Ember.Controller.extend({
        application:Ember.inject.controller(),

        addAcctStrings: translations.all.addAcccount,

        correct: Ember.computed("markedAs", {
            get: function() {
                return this.get("markedAs") === "correct";
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),

        incorrect: Ember.computed("markedAs", {
            get: function () {
                return this.get("markedAs") === "incorrect";
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        actions: {
            markedAsChanged : function(value){
                this.set("markedAs", value);
            },
        },

    });
});
