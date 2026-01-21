define(['i18n!nls/settings',
        'text!templates/settings-payments.html',
        'application', 'settings', 'billers', 'modal-dialog', 'form-helper'],
  function(settingsStrings, settingsPaymentsTemplate) {

    var attr = DS.attr;

    App.Payment = DS.Model.extend({
      total: attr(),
      subTotal: attr(),
      tax: attr(),
      updatedAt: attr("date"),
      documentHref: attr(),

      totalDisplay: Ember.computed("total", {
        get: function() {
          return this.get("total").toFixed("2");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      subTotalDisplay: Ember.computed("subTotal", {
        get: function() {
          return this.get("subTotal").toFixed("2");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      taxDisplay: Ember.computed("tax", {
        get: function() {
          return this.get("tax").toFixed("2");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),
    });

    App.BillerSettingsPaymentsRoute = App.SettingsSubRouteBase.extend({
      model: function() {
        return App.loadBillerSettings(this.modelFor("biller").id, this.store.query("payment", {billerId: this.modelFor("biller").id}));
      },

      setupController: function(controller, model) {
        this._super(controller, model);
        controller.set("biller", this.modelFor("biller"));
      },
    });

    /*App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
      linkTo: "biller.settings.payments",
      name: "payments",
      idx: 5
    }));*/

    Ember.TEMPLATES['biller/settings/payments'] = Ember.Handlebars.compile(settingsPaymentsTemplate);
    App.BillerSettingsPaymentsController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin, {
      application:Ember.inject.controller(),
      billerSettings:Ember.inject.controller(),
      name: "payments",
      settingsStrings: settingsStrings,

      displayPaymentGateway: Ember.computed("biller", {
        get: function () {
          return !this.get("biller").get("masterBiller");
        },
        set: function (key, newValue) {
          return newValue;
        }
      }),

      actions: {
        goToPaymentGatewaySetup: function () {
          window.location.href = "/portal/customer/biller/" + this.get("biller").get("id") + "/settings/payments/view";
        }
      },

      strings: Ember.computed("billerSettings.strings", "biller", {
        get: function() {
          return this.get("billerSettings.strings");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),
    });

  });
