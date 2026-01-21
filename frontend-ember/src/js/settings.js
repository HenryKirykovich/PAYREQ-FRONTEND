define(['i18n!nls/settings',
        'text!templates/settings.html',
				'application', 'billers', 'form-helper'],
			 function(translations, settingsTemplate, userSettingsTemplate) {


    App.loadBillerSettings = function (billerId, modelToReturn) {
        if (App.billerSettings) {
            return modelToReturn;
        } else {
            return Ember.$.get("/data/settings/biller", {billerId: billerId}).then(function (resp) {
                App.billerSettings = resp.billerSettings;
                return modelToReturn;
            });
        }
    };

	App.BillerSettingsRoute = App.BaseBillerRoute.extend({
    model: function() {
      return this.modelFor("biller");
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set("biller", this.modelFor("biller"));
    }
	});

	App.SettingsSubRouteBase = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
		setupController: function(controller, model) {
			this._super(controller, model);
			var biller = this.modelFor("biller");
			controller.set('billerId', biller.id);
			controller.set("biller", biller);
			controller.activate();
		}
	});

	App.SettingsIndexRoute = App.BaseBillerRoute.extend({
		afterModel: function() {
            this.transitionTo("biller.settings.biller");
		}
	});


	App.SettingsTab = Ember.Object.extend({
		title: null,
		name: null,
		linkTo: null,
		active: false,
		idx: 0,
	});

 	Ember.TEMPLATES['biller/settings'] = Ember.Handlebars.compile(settingsTemplate);
	App.BillerSettingsController = Ember.Controller.extend(App.FeatureFilterMixin, {
		active: 'account',

    strings: Ember.computed("biller.channelPartnerSystemId", {
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
    }),

		tabs: Ember.computed('active', 'model', 'biller', {
      get: function() {
        var sortedTabs = App.BillerSettingsController.childTabs.sortBy("idx");
        sortedTabs.forEach(function(tab) {
                            tab.set("title", this.get("strings.capitalised")[tab.get("name")]);
                           }.bind(this));
        return this.filteredByFeature(sortedTabs, this.get("model"));
      },
      set: function(key, newValue) {
        return newValue;
      }
		}),
		subBillerInfo: Ember.computed('model', {
		  get: function() {
		    return this.get("strings.subBillerInfo").fmt(this.get("biller").get("channelPartnerSystemId"),
		                                                       this.get("model.masterBiller.tagName"),
                                                           this.get("model.extBillerId"));
		  },
		  set: function(key, newValue) {
        return newValue;
      }
    }),
	});

	App.BillerSettingsController.reopenClass({
		childTabs: []
	});

	App.BillerSettingsSubControllerBase = Ember.Controller.extend(App.FormHelperMixin, {
		billerId: null,
		name: null,
		billerSettings:Ember.inject.controller(),
    application:Ember.inject.controller(),

        findWithAttr: function (array, attr, value) {
			 for(var i = 0; i < array.length; i += 1) {
				 if(array[i][attr] === value) {
					 return i;
				 }
			 }
			 return -1;
		 },

		activate: function() {
			App.BillerSettingsController.childTabs.setEach("active", false);

			if (!App.billerSettings) return null;

			var billerChannelPartnerSystems = App.billerSettings.billerChannelPartnerSystem;
			var hasAgent = false;
			if (billerChannelPartnerSystems){
                App.BillerSettingsController.childTabs = [];
                billerChannelPartnerSystems.forEach(function(channel) {
                    if(channel.channelPartnerSystemId === "mybillsagent") {
                        hasAgent = true;
                    }
                });
            }

            if(App.billerSettings.systemId === "incoming-invoice" && App.BillerSettingsController.childTabs.length === 0){
                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.connections",
                    name: "connections",
                    idx: 0
                }));
                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.users",
                    name: "accountPermissions",
                    idx: 1
                }));
                if(App.billerSettings.isCompany === true) {
                    App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                        linkTo: "biller.settings.consents",
                        name: "consents",
                        idx: 3
                    }));
                }
                if(App.billerSettings.isCompany) {
                    App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                        href: "/portal/customer/biller/" + this.billerId + "/settings/forwardingRules/view",
                        name: "forwardingRules",
                        idx: 4
                    }));
                }
                if(App.billerSettings.showApi) {
                    App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                        href: "/portal/customer/biller/" + this.billerId + "/settings/apiDetails/view",
                        name: "apiDetails",
                        idx: 5
                    }));
                }
                if(App.billerSettings.isCompany) {
                    App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                        href: "/portal/customer/biller/" + this.billerId + "/settings/bulkDownloadPreference/view",
                        name: "bulkDownloadPreference",
                        idx: 6
                    }));
                }

			} else if (typeof App.billerSettings.systemId !== "undefined" && App.BillerSettingsController.childTabs.length == 0) {
                App.BillerSettingsController.childTabs.push(App.SettingsTab.create(
                    {linkTo: "biller.settings.biller", name: "biller"}));

                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.users",
                    name: "accountPermissions",
                    idx: 1
                }));

                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.billTemplates",
                    name: "billTemplates",
                    idx: 2
                }));

                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.accounting", name: "accounting", idx: 4}));


                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    linkTo: "biller.settings.payments",
                    name: "payments",
                    idx: 5
                }));
                if(hasAgent) {
                    App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                        linkTo: "biller.settings.consents",
                        name: "consents",
                        idx: 6
                    }));
                }
                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    href: "/portal/customer/biller/" + this.billerId + "/settings/contactDetails/view",
                    name: "contactDetails",
                    idx: 7
                }));
                App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
                    href: "/portal/customer/biller/" + this.billerId + "/settings/apiDetails/view",
                    name: "apiDetails",
                    idx: 8
                }));
            }

			var activeTab = App.BillerSettingsController.childTabs.findBy("name", this.get("name"));
            if(activeTab){
                activeTab.set("active", true);
            }
		},
	});

});
