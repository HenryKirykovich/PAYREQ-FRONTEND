define(['i18n!nls/settings',
        'text!templates/settings-accounting.html',
        'text!templates/settings-accounting-summary.html',
        'text!templates/settings-accounting-catalog.html',
        'text!templates/settings-accounting-checkout.html',
        'text!templates/settings-accounting-payment.html',
        'text!templates/components/accounting-plan-group.html',
        'text!templates/components/accounting-payment.html',
                                'application', 'settings', 'billers', 'form-helper','paydock'],
                         function(settingsStrings, settingsAccountingTemplate, settingsAccountingSummaryTemplate, settingsAccountingCatalogTemplate,
                                  settingsAccountingCheckoutTemplate, settingsAccountingCheckoutPaymentTemplate, accountingPlanGroupTemplate,
                                  accountingPaymentTemplate) {

        var attr = DS.attr;

  App.Accounting = DS.Model.extend({
        customerAccountingPlan: DS.hasMany("customerAccountingPlan"),
        customerName: attr(),
        hasPurchaseableAccountingPlans: attr("boolean"),
        chargingModel: attr(),
        billersUsingCredit: attr(),
        currentPayStubCreditBalance: attr("number"),
        currentNonPayStubCreditBalance: attr("number"),
        isBiller: attr("boolean"),
        nonPayrollExists: attr("boolean"),

                hasPlans: Ember.computed("customerAccountingPlan.[]", {
      get: function() {
                        return this.get("customerAccountingPlan").length > 0;
      },
      set: function(key, newValue) {
        return newValue;
      }
                }),

                hasPrepayOnlyPlans: Ember.computed("customerAccountingPlan.[]", {
      get: function() {
                        return this.get("customerAccountingPlan").any(function(plan) {return plan.get("isPrepayOnly");});
      },
      set: function(key, newValue) {
        return newValue;
      }
                }),

      currentPayStubBalanceAdjusted: Ember.computed("currentPayStubCreditBalance", {
          get: function() {
              if (this.get("currentPayStubCreditBalance") <= 0) return 0;
              else return this.get("currentPayStubCreditBalance");
          },
          set: function(key, newValue) {
              return newValue;
          }
      }),

      currentNonPayStubBalanceAdjusted: Ember.computed("currentNonPayStubCreditBalance", {
          get: function() {
              if (this.get("currentNonPayStubCreditBalance") <= 0) return 0;
              else return this.get("currentNonPayStubCreditBalance");
          },
          set: function(key, newValue) {
              return newValue;
          }
      })
        })

        App.CustomerAccountingPlan = DS.Model.extend({
                accountingPlanCredit: DS.hasMany("accountingPlanCredit"),
                startDate: attr("date"),
                endDate: attr("date"),
                name: attr(),
                description: attr(),
                type: attr(),
                autoRollover: attr("boolean"),

                isPrepayOnly: Ember.computed("type", {
      get: function() {
                        return this.get("type") == "pre-pay";
      },
      set: function(key, newValue) {
        return newValue;
      }
                }),

                availableCreditDisplay: Ember.computed("accountingPlanCredit", {
      get: function() {
        if(this.get("type") == "post-pay"){
          return "Unlimited";
        }else{
          var credits = 0;
          this.get("accountingPlanCredit").forEach(function(accountingPlanCredit){
            if(accountingPlanCredit.get("type")=="unlimited"){
              return "Unlimited";
            }else{
              credits = credits + accountingPlanCredit.get("availableCredit");
            }
          });
          return credits;
        }

      },
      set: function(key, newValue) {
        return newValue;
      }
    })
        });

        App.AccountingPlanCredit = DS.Model.extend({
    status: attr(),
    startDate: attr("date"),
    endDate: attr("date"),
    credit: attr("number"),
    description: attr(),
    priority: attr(),
    type: attr(),
    availableCredit: attr("number"),
  });

        App.AccountingPlan = DS.Model.extend({
          accountingPlanComponents: DS.hasMany("accountingPlanComponents"),
    startDate: attr("date"),
    name: attr(),
    description: attr(),
    type: attr(),
    autoRollover: attr("boolean"),
    price: attr(),
    displayCategory: attr(),
    selected: false,
    quantity: 1,

    displayDescription: Ember.computed("name", "description", {
      get: function() {
        if(this.get("description")){
          return this.get("name")+"("+this.get("description")+")";
        }
        return this.get("name");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    priceDisplay: Ember.computed("price", {
      get: function() {
        return this.get("price").toFixed("2");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    total: Ember.computed("quantity", {
      get: function() {
        return +((this.get("price") * this.get("quantity")).toFixed("2"));
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    totalDisplay: Ember.computed("total", {
      get: function() {
        return this.get("total").toFixed("2");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),
  });

  App.AccountingPlanComponent = DS.Model.extend({
    startDate: attr("date"),
    endDate: attr("date"),
    description: attr(),
    credit: attr(),
    actorSystemBillType: attr(),
    type: attr(),
    isSizeCreditComponent: attr("boolean")
  });

  App.Tax = DS.Model.extend({
    name: attr(),
    countryId: attr(),
    stateId: attr(),
    percentage: attr(),
    sequenceNo: attr(),
    subTotal: 0,

    amount: Ember.computed("subTotal", {
      get: function() {
        return +(((this.get("percentage")/100)*(this.get("subTotal"))).toFixed("2"));
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    amountDisplay: Ember.computed("amount", {
      get: function() {
        return this.get("amount").toFixed("2");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),
  });

  App.AccountingPlanCategory = DS.Model.extend({
    name: attr(),
    displayCategoryOrder: attr("number")
  });

        //App.BillerSettingsController.childTabs.push(App.SettingsTab.create({linkTo: "biller.settings.accounting", name: "accounting", idx: 4}));

        App.BillerSettingsAccountingIndexRoute = App.SettingsSubRouteBase.extend({
    model: function(params) {
      var billerId =  this.modelFor("biller").id;
      return App.loadBillerSettings(billerId, this.store.query("accounting", {billerId: billerId}))
    }
  });

  Ember.TEMPLATES['biller/settings/accounting/index'] = Ember.Handlebars.compile(settingsAccountingSummaryTemplate);
  App.BillerSettingsAccountingIndexController = App.BillerSettingsSubControllerBase.extend({
    application:Ember.inject.controller(),
    billerSettings:Ember.inject.controller(),
    name: "accounting",
    settingsStrings: settingsStrings,

    accounting: Ember.computed("model", {
      get: function() {
        return this.get("model").objectAt(0);
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    paystubRemainingUrgency: Ember.computed("accounting.currentPayStubBalanceAdjusted", {
        get: function() {
            var numCredits = this.get("accounting.currentPayStubBalanceAdjusted");

            var urgency = "panel-info";
            if (numCredits < 10) {
                urgency = "panel-warning";
            }
            if (numCredits < 5) {
                urgency = "panel-danger";
            }
            return urgency;
        },
        set: function(key, newValue) {
            return newValue;
        }
    }),

    nonPaystubRemainingUrgency: Ember.computed("accounting.currentNonPayStubBalanceAdjusted", {
        get: function() {
            var numCredits = this.get("accounting.currentNonPayStubBalanceAdjusted");

            var urgency = "panel-info";
            if (numCredits < 10) {
                urgency = "panel-warning";
            }
            if (numCredits < 5) {
                urgency = "panel-danger";
            }
            return urgency;
        },
        set: function(key, newValue) {
            return newValue;
        }
    })
  });

  App.BillerSettingsAccountingCatalogIndexRoute = App.SettingsSubRouteBase.extend({
    model: function(params) {
      return this.store.query("accountingPlan", {billerId: this.modelFor("biller").id});
    },

    afterModel: function(model){
      if(!model || !model.get("length") || model.get("length")<=0){
        this.transitionTo("biller.settings.accounting");
      }
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set("biller", this.modelFor("biller"));
    },
  });

  Ember.TEMPLATES['biller/settings/accounting/catalog/index'] = Ember.Handlebars.compile(settingsAccountingCatalogTemplate);
  App.BillerSettingsAccountingCatalogIndexController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin, {
    application:Ember.inject.controller(),
    billerSettings:Ember.inject.controller(),
    name: "accounting",
    settingsStrings: settingsStrings,

    strings: Ember.computed("billerSettings.strings", "biller", {
      get: function() {
        return this.get("billerSettings.strings");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    categories: Ember.computed("biller", "model", {
      get: function() {
        var self = this;
        var categories = Ember.A();
        this.get("model").forEach(function(accountingPlan) {
          var category = self.store.peekRecord("accountingPlanCategory", accountingPlan.get("displayCategory"));
          if(categories.indexOf(category) == -1){
            categories.push(category);
          }
        });
        return categories.sortBy("displayCategoryOrder");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    selectedAccountingPlans: Ember.computed("biller", {
      get: function() {
        //reset the selected flag on accounting plan
        this.store.peekAll("accountingPlan").forEach(function(accountingPlan) {
          Ember.set(accountingPlan, "selected", false);
        });
        return [];
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    numberOfSelectedAccountingPlans: Ember.computed("selectedAccountingPlans.[]", {
      get: function() {
        return this.get("selectedAccountingPlans").length;
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    hasSelectedAccountingPlans: Ember.computed("numberOfSelectedAccountingPlans", {
      get: function() {
        return this.get("numberOfSelectedAccountingPlans")>0;
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    actions:{
      accountingPlanClicked: function(accountingPlan){
        var selectedAccountingPlans = this.get("selectedAccountingPlans");
        var index = selectedAccountingPlans.indexOf(accountingPlan);
        if(index == -1){
          selectedAccountingPlans.pushObject(accountingPlan);
        }else{
          selectedAccountingPlans.removeObject(accountingPlan);
        }
      }
    },

  });

  //Component to display an accounting plan category
  Ember.TEMPLATES['components/accounting-plan-group'] = Ember.Handlebars.compile(accountingPlanGroupTemplate);
  App.AccountingPlanGroupComponent = Ember.Component.extend({
    strings:null,
    accountingPlanCategory:null,
    allAccountingPlans:null,
    currencyCode:null,
    currencySymbol:null,
    tagName : "",

    displayName: Ember.computed("accountingPlanCategory.name", "strings", {
      get: function(key, value) {
        var displayName = this.get("strings.accountingPlan.accountingPlanGroups")[this.get("accountingPlanCategory.name")];
        if(displayName){
          return displayName;
        }
        return this.get("accountingPlanCategory.name");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    categoryElementId: Ember.computed("accountingPlanCategory.name", {
      get: function(key, value) {
        return this.get("accountingPlanCategory.name");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    href: Ember.computed("categoryElementId", {
      get: function(key, value) {
        return "#" + this.get("categoryElementId");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    accountingPlans: Ember.computed("allAccountingPlans", "biller",{
      get: function(key, value) {
        var self = this;
        var accountingPlans = [];
        this.get("allAccountingPlans").forEach(function(accountingPlan) {
          //Ember.set(accountingPlan, "selected", false);
          var categoryName = self.get("accountingPlanCategory.name");
          if(categoryName == accountingPlan.get("displayCategory")){
            accountingPlans.push(accountingPlan);
          }
        });
        return accountingPlans;
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    actions:{
      accountingPlanClicked: function(accountingPlan){
        Ember.set(accountingPlan, "selected", !accountingPlan.get("selected"));
        this.sendAction("accountingPlanClicked", accountingPlan);
      }
    },
  });


  App.BillerSettingsAccountingCatalogCheckoutIndexRoute = App.SettingsSubRouteBase.extend({
    redirect: function(model, transition) {
      if(this.controllerFor('application').get("currentPath") != "biller.settings.accounting.catalog.index"
          && this.controllerFor('application').get("currentPath") != "biller.settings.accounting.catalog.checkout.payment"){
        this.transitionTo("biller.settings.accounting.catalog");
      }
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set("biller", this.modelFor("biller"));
    },
  });

  Ember.TEMPLATES['biller/settings/accounting/catalog/checkout/index'] = Ember.Handlebars.compile(settingsAccountingCheckoutTemplate);
  App.BillerSettingsAccountingCatalogCheckoutIndexController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin, {
    application:Ember.inject.controller(),
    billerSettings:Ember.inject.controller(),
    billerSettingsAccountingCatalogIndex:Ember.inject.controller(),
    name: "accounting",
    settingsStrings: settingsStrings,

    strings: Ember.computed("billerSettings.strings", "biller", {
      get: function() {
        return this.get("billerSettings.strings");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    selectedAccountingPlans : Ember.computed("billerSettingsAccountingCatalogIndex.selectedAccountingPlans", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogIndex.selectedAccountingPlans");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    hasSelectedAccountingPlans : Ember.computed("selectedAccountingPlans.[]", {
      get: function() {
        return (this.get("selectedAccountingPlans") && this.get("selectedAccountingPlans").length>0);
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    subTotal: Ember.computed("selectedAccountingPlans.@each.total", {
      get: function() {
        var subTotal = 0;
        var accountingPlans = this.get("selectedAccountingPlans");
        if(accountingPlans){
          for(var i=0; i<accountingPlans.get("length"); i++){
            subTotal = subTotal + accountingPlans.objectAt(i).get("total");
          }
        }
        return +(subTotal.toFixed("2"));
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

    taxes: Ember.computed("country", "stateId", "subTotal", {
      get: function() {
        var self = this;
        var taxes = this.store.peekAll("tax");
        var applicableTaxes = [];
        if(taxes){
          if(this.get("stateId")){
            if(taxes.filterBy("stateId", this.get("stateId"))){
              var stateTaxes = taxes.filterBy("stateId", parseInt(this.get("stateId")));
              applicableTaxes = applicableTaxes.concat(stateTaxes);
            }
          }
          if(this.get("country")){
            if(taxes.filterBy("countryId", this.get("country").get("id"))){
              var countryTaxes = taxes.filterBy("countryId", parseInt(this.get("country").get("id"))).filterBy("stateId", null);
              applicableTaxes = applicableTaxes.concat(countryTaxes);
            }
          }
        }
        applicableTaxes.forEach(function(tax){
          Ember.set(tax, "subTotal", self.get("subTotal"));
        });
        return applicableTaxes.sortBy("sequenceNo");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    taxTotal: Ember.computed("taxes", "subTotal", {
      get: function() {
        var taxTotal=0;
        if(this.get("taxes")){
          this.get("taxes").forEach(function(tax){
            taxTotal = taxTotal+tax.get("amount");
          });
        }
        return +(taxTotal.toFixed("2"));
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    total: Ember.computed("taxTotal", "subTotal", {
      get: function() {
        return +((this.get("taxTotal")+this.get("subTotal")).toFixed("2"));
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    totalDisplay: Ember.computed("total", {
      get: function() {
        return this.get("total").toFixed("2");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    actions: {
      removeAccountingPlanFromCheckout: function(accountingPlan){
        if(accountingPlan){
          Ember.set(accountingPlan, "selected", false);
          this.get("selectedAccountingPlans").removeObject(accountingPlan);
        }
      }
    }

  });

  App.BillerSettingsAccountingCatalogCheckoutPaymentRoute = App.SettingsSubRouteBase.extend({
    model: function(params) {
      return Ember.$.get("/data/settings/payment-gateway-details", {billerId: this.modelFor("biller").get("id")});
    },

    afterModel: function(model) {
      if(this.controllerFor('application').get("currentPath") != "biller.settings.accounting.catalog.checkout.index"){
        this.transitionTo("biller.settings.accounting.catalog");
      }
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set("biller", this.modelFor("biller"));
    },

    actions : {
      processPayment: function(paymentToken, total, subTotal, taxAmount, taxes, selectedAccountingPlans){
        console.log("Inside processing payment");
        this.doRemoteAction(function() {
          var biller = this.modelFor("biller");
          var accountingPlans = [];
          selectedAccountingPlans.forEach(function(accountingPlan){
            accountingPlans.push({id:parseInt(accountingPlan.get("id")),
                                  quantity:""+accountingPlan.get("quantity"),
                                  total:""+accountingPlan.get("total")});
          });
          var appliedTaxes = [];
          if(taxes){
            taxes.forEach(function(tax){
              appliedTaxes.push({id: parseInt(tax.get("id")),
                                amount: tax.get("amount")});
            });
          }

          return Ember.$.post("/data/settings/process-payment-transaction",
                        {billerId: parseInt(biller.get("id")),
                         customerId: biller.get("customerId"),
                         paymentToken: paymentToken,
                         total,
                         subTotal,
                         taxAmount,
                         taxes: appliedTaxes,
                         accountingPlans: accountingPlans,
            });
        },
        function(results) {
          if(results.success){
            this.showSuccessMessage("Payment processed successfully.");
            this.controllerFor("biller.settings.accounting.catalog.checkout.payment").set("error", null);
            this.transitionTo("biller.settings.accounting");
          }else{
            this.controllerFor("biller.settings.accounting.catalog.checkout.payment").set("error", results.message);
            var iframe = document.getElementById('paydoc');
            iframe.src = iframe.src;
            this.showErrorMessage("Error occured : "+results.message);
          }

        },
        "An error occurred while processing the payment. Please try again later.");
      }
    }
  });

  Ember.TEMPLATES['biller/settings/accounting/catalog/checkout/payment'] = Ember.Handlebars.compile(settingsAccountingCheckoutPaymentTemplate);
  App.BillerSettingsAccountingCatalogCheckoutPaymentController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin, {
    application:Ember.inject.controller(),
    billerSettings:Ember.inject.controller(),
    billerSettingsAccounting:Ember.inject.controller(),
    billerSettingsAccountingCatalogCheckoutIndex:Ember.inject.controller(),
    error: null,
    name: "accounting",
    settingsStrings: settingsStrings,

    strings: Ember.computed("billerSettings.strings", "biller", {
      get: function() {
        return this.get("billerSettings.strings");
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    iFrameSrc: Ember.computed("model", "strings", {
      get: function() {
        return this.get("strings.accountingPlan.payDockIFrameSource").fmt(this.get("model.widgetUrl"),
                                                                          this.get("model.publicKey"),
                                                                          this.get("model.configurationToken"));
      },
      set: function(key, newValue) {
        return newValue;
      }
    }),

    currencyCode: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.currencyCode", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.currencyCode");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    taxes: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.taxes", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.taxes");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    taxTotal: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.taxTotal", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.taxTotal");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    subTotal: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.subTotal", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.subTotal");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    subTotalDisplay: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.subTotalDisplay", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.subTotalDisplay");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    total: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.total", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.total");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    totalDisplay: Ember.computed("billerSettingsAccountingCatalogCheckoutIndex.total", {
      get: function() {
        return this.get("billerSettingsAccountingCatalogCheckoutIndex.totalDisplay");
      },
      set: function(key, newValue) {
       return newValue;
      }
    }),

    actions : {
      processPaymentAction: function(paymentToken){
        this.send("processPayment", paymentToken, this.get("total"), this.get("subTotal"), this.get("taxTotal"), this.get("taxes"),
                                                  this.get("billerSettingsAccountingCatalogCheckoutIndex.selectedAccountingPlans"));
      }
    }
  });

  //Component to integrate payment page
  Ember.TEMPLATES['components/accounting-payment'] = Ember.Handlebars.compile(accountingPaymentTemplate);
  App.AccountingPaymentComponent = Ember.Component.extend({
    strings:null,
    accountingPlanCategory:null,
    allAccountingPlans:null,
    currencyCode:null,

    onMessage: function(data){
      var eventData = JSON.parse(data.originalEvent.data);
      if (eventData.event === 'finish'){
          this.sendAction("processPaymentAction",eventData.payment_source);
      }
    },

    init: function() {
        this._super(arguments);
        Ember.set(this, 'boundOnMessage', Ember.run.bind(this, this.get('onMessage')));
    },
    didInsertElement: function() {
        this._super(arguments);
        jQuery(window).on('message', this.get('boundOnMessage'));
    },
    willDestroyElement: function() {
        this._super(arguments);
        jQuery(window).off('message', this.get('boundOnMessage'));
    }
  });

});
