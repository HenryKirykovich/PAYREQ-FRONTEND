define(['i18n!nls/settings',
        'text!templates/settings-connections.html',
        'application', 'settings', 'billers', 'form-helper'],
  function(settingsStrings, settingsConnectionsTemplate) {

    var attr = DS.attr;

    App.Connection = DS.Model.extend({
        xeroConnection: attr(),
        myobConnection: attr(),
        myobEnabled: attr(),
        reckonConnection: attr(),
        propertymeConnection: attr(),

        isMyobAccountRight: Ember.computed("myobConnection", {
            get: function() {
                return this.get("myobConnection")[0].extraInfo1 === "AccountRight";
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),
    });

    App.BillerSettingsConnectionsRoute = App.SettingsSubRouteBase.extend( App.ModalProducingControllerMixin,
        App.FormHelperMixin, {
          model: function() {
            return App.loadBillerSettings(this.modelFor("biller").id, this.execReload())
          },

          setupController: function(controller, model) {
            this._super(controller, model);
            controller.set("biller", this.modelFor("biller"));
            controller.set("myobProduct", "3");
            controller.set("reckonCountry", "Australia");
            controller.set("accountRightPasswordUpdate", null);
          },

        execReload: function() {
            return this.store.query("connection", {billerId: this.modelFor("biller").id}).then(function(results) {
                return results.get('firstObject');
            });
        },



        xeroDisconnectConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.cancel, actionName: "cancel"}),
            App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.disconnect, bsType: "btn-danger", actionName: "confirm"})],

        myobDisconnectConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.cancel, actionName: "cancel"}),
            App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.disconnect, bsType: "btn-danger", actionName: "confirm"})],

        reckonDisconnectConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.cancel, actionName: "cancel"}),
            App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.disconnect, bsType: "btn-danger", actionName: "confirm"})],

        propertymeDisconnectConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.cancel, actionName: "cancel"}),
            App.ModelDialogActionButton.create({label: settingsStrings.all.connectionSettings.disconnect, bsType: "btn-danger", actionName: "confirm"})],


            actions: {
          connectToXero: function(){
              return Ember.$.get("/data/settings/xero/%@/connecttoxero/%@/%@".fmt(this.modelFor("biller").get("id"), "1", "settings"))
                  .done($.proxy(function(response){
                      window.top.location.href = response.requesttoken.uri;
                  }, this));
          },

          connectToMyob: function(myobProduct){

                return Ember.$.get("/data/settings/myob/%@/connecttomyob/%@/%@".fmt(this.modelFor("biller").get("id"), "1", "settings"), {product: myobProduct})
                    .done($.proxy(function(response){
                            window.top.location.href = response.requesttoken.uri;
                    }, this));

          },

          connectToReckon: function(reckonCountry, reckonCompanyFile, reckonApiUsername, reckonApiPassword){

                return Ember.$.get("/data/settings/reckon/%@/connecttoreckon/%@/%@".fmt(this.modelFor("biller").get("id"), "1", "settings"),
                    {reckonCountry: reckonCountry, reckonCompanyFile: reckonCompanyFile,
                    reckonApiUsername: reckonApiUsername, reckonApiPassword: reckonApiPassword})
                    .done($.proxy(function(response){
                        window.top.location.href = response.requesttoken.uri;
                    }, this));

          },

          connectToPropertyMe: function () {
                return Ember.$.get("/data/settings/propertyme/%@/connecttopropertyme/%@/%@".fmt(this.modelFor("biller").get("id"), "1", "settings"))
                    .done($.proxy(function(response){
                        window.top.location.href = response.requesttoken.uri;
                    }, this));
          },

        updateReckonConnetion:function(id, reckonCountry, reckonCompanyFile, reckonApiUsername, reckonApiPassword){
            this.doRemoteAction(function() {
                    return $.post("/data/settings/reckon/update/%@".fmt(id),
                        {reckonCountry: reckonCountry, reckonCompanyFile: reckonCompanyFile, reckonApiUsername: reckonApiUsername, reckonApiPassword: reckonApiPassword});
                },
                function(results) {
                    this.refresh();
                },
                "An error occured while trying to disconnect from xero. Please try again later.");
        },

                showAndHide: function (collapseName) {
                    var collapseElement = $("#" + collapseName);
                    if (collapseElement.hasClass("in")) {
                        this.controller.set(collapseName, false);
                    } else {
                        this.controller.set(collapseName, true);
                    }
                },


                actionDisconnectFromXero:function(id){
                this.doRemoteAction(function() {
                        return $.post("/data/settings/xero/disconnect/%@".fmt(id));
                    },
                    function(results) {
                        this.refresh();
                    },
                    "An error occured while trying to disconnect from xero. Please try again later.");
          },

          disconnectFromXeroModal: function(id){
              this.set("xeroDisconnect", id);
              this.showModal("confirm-xero-disconnect");
          },

          disconnectFromXero: function(){
            this.send("actionDisconnectFromXero", this.get("xeroDisconnect"));
          },

          actionDisconnectFromMyob:function(id){
            this.doRemoteAction(function() {
                    return $.post("/data/settings/myob/disconnect/%@".fmt(id));
                },
                function(results) {
                    this.refresh();
                },
                "An error occured while trying to disconnect from Myob. Please try again later.");
          },
          disconnectFromMyobModal: function(id){
            this.set("myobDisconnect", id);
            this.showModal("confirm-myob-disconnect");
          },

          disconnectFromMyob: function(){
            this.send("actionDisconnectFromMyob", this.get("myobDisconnect"));
          },

          actionDisconnectFromPropertyMe:function(id){
                this.doRemoteAction(function() {
                        return $.post("/data/settings/propertyme/disconnect/%@".fmt(id));
                    },
                    function(results) {
                        this.refresh();
                    },
                    "An error occured while trying to disconnect from PropertyMe. Please try again later.");
          },

        disconnectFromPropertyMeModal: function(id){
            this.set("propertymeDisconnect", id);
            this.showModal("confirm-propertyme-disconnect");
        },

        disconnectFromPropertyMe: function(){
            this.send("actionDisconnectFromPropertyMe", this.get("propertymeDisconnect"));
        },

        actionDisconnectFromReckon:function(id){
            this.doRemoteAction(function() {
                    return $.post("/data/settings/reckon/disconnect/%@".fmt(id));
                },
                function(results) {
                    this.refresh();
                },
                "An error occured while trying to disconnect from Reckon. Please try again later.");
        },

        disconnectFromReckonModal: function(id){
            this.set("reckonDisconnect", id);
            this.showModal("confirm-reckon-disconnect");
        },

        disconnectFromReckon: function(){
            this.send("actionDisconnectFromReckon", this.get("reckonDisconnect"));
        },

      }
    });

    // App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
    //   linkTo: "biller.settings.connections",
    //   name: "connections",
    //   idx: 6
    // }));


    Ember.TEMPLATES['biller/settings/connections'] = Ember.Handlebars.compile(settingsConnectionsTemplate);
    App.BillerSettingsConnectionsController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin,  App.ModalProducingControllerMixin,
        {
        application: Ember.inject.controller(),
        billerSettings: Ember.inject.controller(),
        billerSettingsConnections: Ember.inject.controller(),
        name: "connections",
        strings: settingsStrings,

        myobProducts: Ember.computed({
            get: function() {
                return [{id: "3", name: "MYOB AccountRight"}, {id: "1", name: "MYOB Essentials AU"}, {id: "2", name: "MYOB Essentials NZ"}];
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),

        showSearchCollapse1: Ember.computed("model", {
            get: function () {
                var search = this.get("collapse1");
                if (typeof search == 'undefined') {
                    return false;
                }
                return search;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        showSearchCollapseAct1: Ember.computed("model", {
            get: function () {
                var search = this.get("collapseAct1");
                if (typeof search == 'undefined') {
                    return false;
                }
                return search;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        showSearchCollapseAct2: Ember.computed("model", {
            get: function () {
                var search = this.get("collapseAct2");
                if (typeof search == 'undefined') {
                    return false;
                }
                return search;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        showSearchCollapseAct2: Ember.computed("model", {
            get: function () {
                var search = this.get("collapseAct3");
                if (typeof search == 'undefined') {
                    return false;
                }
                return search;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        hasPropertyMeConnection: Ember.computed("model", {
          get: function () {
              return this.get("model.propertymeConnection").length > 0;
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        hasXeroConnection: Ember.computed("model", {
            get: function () {
                return this.get("model.xeroConnection").length > 0;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        xeroNeedsAttention: Ember.computed("model", {
            get: function () {
                return this.get("model.xeroConnection").filter(function(c) {return c.needsAttention}).length > 0;
            }
        }),

        hasMyobConnection: Ember.computed("model", {
            get: function () {
                return this.get("model.myobConnection").length > 0;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        myobNeedsAttention: Ember.computed("model", {
            get: function () {
                return this.get("model.myobConnection").filter(function(c) {return c.needsAttention}).length > 0;
            }
        }),

        hasReckonConnection: Ember.computed("model", {
            get: function () {
                return this.get("model.reckonConnection").length > 0;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        reckonNeedsAttention: Ember.computed("model", {
            get: function () {
                return this.get("model.reckonConnection").filter(function(c) {return c.needsAttention}).length > 0;
            }
        }),


        isAccountRight: Ember.computed("myobProduct", {
            get: function() {
                return this.get("myobProduct") === "3";
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),

        strings: Ember.computed("billerSettings.strings", "biller", {
            get: function() {
              return this.get("billerSettings.strings");
            },
            set: function(key, newValue) {
              return newValue;
            }
          }),

        reckonCountries: Ember.computed({
            get: function() {
                return [{id: "Australia", name: "Australia"}, {id: "New Zealand", name: "New Zealand"}];
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),


        });

    Ember.TEMPLATES['confirm-xero-disconnect'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\""+ settingsStrings.all.connectionSettings.xero.disconnectMessage+"\" actionButtons=xeroDisconnectConfirmActionButtons " +
      "onClose=\"closeModal\" confirm=\"disconnectFromXero\"}}" +
        settingsStrings.all.connectionSettings.xero.modalMessage+
      "{{/modal-dialog}}");

    Ember.TEMPLATES['confirm-myob-disconnect'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"" +settingsStrings.all.connectionSettings.myob.disconnectMessage+"\" actionButtons=myobDisconnectConfirmActionButtons " +
      "onClose=\"closeModal\" confirm=\"disconnectFromMyob\"}}" +
        settingsStrings.all.connectionSettings.myob.modalMessage+
      "{{/modal-dialog}}");

    Ember.TEMPLATES['confirm-reckon-disconnect'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\""+settingsStrings.all.connectionSettings.reckon.disconnectMessage + "\" actionButtons=reckonDisconnectConfirmActionButtons " +
      "onClose=\"closeModal\" confirm=\"disconnectFromReckon\"}}" +
        settingsStrings.all.connectionSettings.reckon.modalMessage+
      "{{/modal-dialog}}");

    Ember.TEMPLATES['confirm-propertyme-disconnect'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"" + settingsStrings.all.connectionSettings.propertyMe.buttonDisconnect + "\" actionButtons=propertymeDisconnectConfirmActionButtons " +
      "onClose=\"closeModal\" confirm=\"disconnectFromPropertyMe\"}}" +
        settingsStrings.all.connectionSettings.propertyMe.modalMessage +
      "{{/modal-dialog}}");

  });
