define(['i18n!nls/settings',
        'text!templates/settings-consent.html',
        'application', 'settings', 'billers', 'form-helper'],
    function(translations, settingsConsentTemplate) {

    var attr = DS.attr;

    App.Consent = DS.Model.extend({
        userId: attr(),
        billerId: attr(),
        uid: attr(),
        status: attr(),
        tagName: attr(),
        noticeId: attr(),
        authorisedOn: attr('date'),
        unauthorisedOn: attr('date'),
        isEditing: attr('boolean'),

        regStrings: Ember.computed("channelPartnerSystemId", {
            get: function() {
                return App.StringsMap.create({baseMap: translations, classifier: "bpv"});
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),

        statusDescription: Ember.computed("regStrings", "status", {
            get: function() {
                return this.get("regStrings.consentSettings.status")[this.get("status")];
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),

        isActive: Ember.computed( "status", {
            get: function() {
                return this.get("status")==="authorised" || this.get("status")==="pending";
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),

        isPending: Ember.computed( "status", {
            get: function() {
                return this.get("status")==="pending";
            },
            set: function(key, newValue) {
                return newValue;
            }

        }),



    });

  App.BillerSettingsConsentsRoute = App.SettingsSubRouteBase.extend(App.RouteWithRemoteActionsMixin,
      App.ModalProducingControllerMixin, {
          model: function() {
              return App.loadBillerSettings(this.modelFor("biller").id, this.execReload(null));
          },

          setupController: function(controller, model) {
              this._super(controller, model);
              controller.set("biller", this.modelFor("biller"));
              controller.set("resenderrormessage", null);
              controller.set("errormessage", null);
              controller.set("searchTerm", null);
          },

          execReload: function(searchTerm){
              return this.store.query("consent", {billerId: this.modelFor("biller").id,
                                                  searchTerm: searchTerm});
          },

          unauthoriseConfirmActionButtons: [App.ModelDialogActionButton.create({label: translations.all.consentSettings.cancel, actionName: "cancel"}),
              App.ModelDialogActionButton.create({label: translations.all.consentSettings.ok, bsType: "btn-danger", actionName: "confirm"})],

          actions: {
              reloadData: function() {
                  var searchTerm = this.controller.get("searchTerm");
                  this.doRemoteAction(function() {
                          return this.execReload(searchTerm);
                      },
                      function(results) {
                          this.controller.set("model", results);
                      },
                      this.controller.get("strings.consentSettings.getAuthError"));
              },

              getAuthorisations: function(searchTerm) {
                  this.controller.set("searchTerm", searchTerm);
                  this.doRemoteAction(function() {
                          return this.execReload(searchTerm);
                      },
                      function(results) {
                          this.controller.set("model", results);
                      },
                      this.controller.get("strings.consentSettings.getAuthError"));
              },

              requestConsent: function(mybillsAgentEmail, noticeId){
                  var self = this;
                  this.controller.set("errormessage", null);
                  this.controller.set("resenderrormessage", null);
                  this.doRemoteAction(function() {
                          return Ember.$.post("/data/settings/consent",
                              {mybillsagentemail: mybillsAgentEmail,
                               noticeId: noticeId,
                               billerId: self.modelFor("biller").get("id")});
                      },
                      function(resp) {
                          if ( resp.success ) {
                              this.showSuccessMessage(this.controller.get("strings.consentSettings.sentConsent").fmt(mybillsAgentEmail));
                              this.send('reloadData');
                          }
                          else {
                              var errorMsg = translations.all.consentSettings.errors[resp.error];



                              if (["pending.rego", "no.user"].includes(resp.error)) {
                                  errorMsg = errorMsg.fmt(mybillsAgentEmail);
                              }

                              this.controller.set("errormessage", errorMsg);
                              this.showErrorMessage(errorMsg);
                          }
                      },
                      this.controller.get("strings.consentSettings.sentConsentError"));
              },

              removeAuthorisation: function(){
                  var self = this;
                  var errorMessage = this.controller.get("strings.consentSettings.removeAuthError");
                  var consent = this.controller.get("removeAuthorisation");
                  this.controller.set("resenderrormessage", null);
                  this.controller.set("errormessage", null);
                  this.doRemoteAction(function() {
                          return Ember.$.post("/data/settings/consent/unauthorise",
                              {id: consent.id, billerId: self.modelFor("biller").get("id")});
                      },
                      function(resp) {
                          if ( resp.success ) {
                              var successMsg = this.controller.get("strings.consentSettings.removeAuth").fmt(consent.get("uid"));
                              if (consent.get("tagName")){
                                  successMsg = this.controller.get("strings.consentSettings.removeAuthBiller").fmt(consent.get("tagName"), consent.get("uid"));
                              }
                              this.showSuccessMessage(successMsg);
                              this.send('reloadData');
                          }
                          else {
                              this.controller.set("resenderrormessage", errorMessage);
                              this.showErrorMessage(errorMessage);
                          }
                      },
                      errorMessage);
              },

              removeAuthorisationModal: function(consent){
                  this.controller.set("removeAuthorisation", consent);
                  this.set("email", consent.get("uid"));
                  this.showModal("confirm-unauthorise");
              },

              resendAuthorisation: function(consent){
                  var self = this;
                  var errorMessage = this.controller.get("strings.consentSettings.resendErrorMessage");
                  this.controller.set("resenderrormessage", null);
                  this.controller.set("errormessage", null);
                  this.doRemoteAction(function() {
                          return Ember.$.post("/data/settings/consent/resend",
                              {id: consent.id, billerId: self.modelFor("biller").get("id")});
                      },
                      function(resp) {
                          if ( resp.success ) {
                              this.showSuccessMessage(this.controller.get("strings.consentSettings.resendSuccess").fmt(consent.get("uid")));
                          }
                          else {
                              if (resp.error ){
                                  this.controller.set("resenderrormessage", this.controller.get("strings.consentSettings.resendErrors")[resp.error].fmt(consent.get("uid")));
                                  this.showErrorMessage(resp.error);
                              } else {
                                  this.controller.set("resenderrormessage", errorMessage);
                                  this.showErrorMessage(errorMessage);
                              }
                          }
                      },
                      errorMessage);
              },

              editAuthorisation: function(consent){
                  this.store.findRecord('consent', consent.id).then(function(item) {
                      // ...after the record has loaded
                      item.set('isEditing', true);
                  });
              },

              cancelAuthorisation: function(consent){
                  consent.rollbackAttributes();
                  this.store.findRecord('consent', consent.id).then(function(item) {
                      // ...after the record has loaded
                      item.set('isEditing', false);
                  });
              },

              saveAuthorisation: function(consent){
                  this.doRemoteAction(function () {
                          return consent.save();
                      },
                      function (results) {
                          //this.transitionTo("biller.contact", results.get("updatedToId"));
                          this.showSuccessMessage(this.controller.get("strings.consentSettings.authUpdate"));
                      },
                      function (results) {
                          this.showErrorMessage(this.controller.get("strings.consentSettings.authUpdateError"));
                          consent.rollbackAttributes();

                      });

                  this.store.findRecord('consent', consent.id).then(function(item) {
                      // ...after the record has loaded
                      item.set('isEditing', false);
                  });
              },
          }
      });

  Ember.TEMPLATES['biller/settings/consents'] = Ember.Handlebars.compile(settingsConsentTemplate);
  App.BillerSettingsConsentsController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin,  App.ModalProducingControllerMixin,
      {
          application: Ember.inject.controller(),
          billerSettings: Ember.inject.controller(),
          name: "consents",

          settingsStrings: translations.all,

          strings: Ember.computed("billerSettings.strings", "biller", {
              get: function() {
                  return this.get("billerSettings.strings");
              },
              set: function(key, newValue) {
                  return newValue;
              }
          }),

          getMeta : function(){
              return this.get("model.meta");
          },

          isBiller: Ember.computed("model", {
             get: function(){
                 return this.getMeta().isBiller;
             },
             set: function (key, newValue) {
                 return newValue;
             }
          }),

          allowAgentRegistrationsFromContacts: Ember.computed("model", {
              get: function(){
                  return this.getMeta().allowAgentRegistrationsFromContacts;
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),


      });

        Ember.TEMPLATES['confirm-unauthorise'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\""+translations.all.consentSettings.unauthoriseModalHeading+"\" actionButtons=unauthoriseConfirmActionButtons " +
            "onClose=\"closeModal\" confirm=\"removeAuthorisation\"}}" +
            translations.all.consentSettings.unauthoriseModalText +
            "{{/modal-dialog}}");


  });
