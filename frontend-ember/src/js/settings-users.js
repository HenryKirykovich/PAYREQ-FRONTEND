define(['i18n!nls/settings',
        'text!templates/settings-users.html',
        'text!templates/settings-users-user.html',
        'text!templates/settings-users-create.html',
        'application', 'settings', 'billers', 'modal-dialog', 'tabular-data-helper'],
  function(settingsStrings, settingsUsersTemplate, settingsUsersUserTemplate, settingsUsersCreateTemplate) {

    var attr = DS.attr;
    App.Role = DS.Model.extend({
      name: attr(),
      grouping: attr()
    });

    App.Role.reopenClass({
      all: function(store) {
        return store.findAll("role");
      }
    });

    App.User = DS.Model.extend({
      uid: attr(),
      email: attr(),
      userRoles: DS.hasMany("userRole", {async: true}),
      status: attr(),
      name: attr(),
      billerId: attr(),
      name: attr(),
      workPhoneNumber: attr(),
      mobileNumber: attr(),
      notes: attr(),
      active: false,
      hasPasswordResetRequest: attr("boolean"),
      passwordResetRequestedOn: attr("date"),
      passwordResetHref: attr(),
      language: attr(),
      mfaRequired: attr("boolean"),
      mfaActivated: attr("boolean"),
      billersToAdd: attr(),

      isPending: Ember.computed("status", {
        get: function() {
          return this.get("status") == "pending";
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isLocked: Ember.computed("status", {
        get: function() {
          return this.get("status") == "locked";
        },
        set: function(key, newValue) {
          return newValue;
        }
      })
    });

    App.UserRole = DS.Model.extend({
      customerActorId: attr(),
      customerId: attr()
    });

    App.ChildBiller = DS.Model.extend({
      customerName: attr(),
      tagName: attr(),
      tag: attr(),
      customerId: attr("string"),
    });



    Ember.TEMPLATES['confirm-mfa-activation'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\""+ settingsStrings.all.userSettings.mfaActivateModalHeading +"\" actionButtons=mfaActivationConfirmActionButtons " +
        "onClose=\"closeModal\" confirm=\"activateMfa\"}}" +
        settingsStrings.all.userSettings.mfaActivateModalText +
        "{{/modal-dialog}}");


    App.BillerSettingsUsersRoute = App.SettingsSubRouteBase.extend(App.ModalProducingControllerMixin, {
      model: function() {
        return App.loadBillerSettings(this.modelFor("biller").id, this._getUsers())
      },

      redirect: function(model, transition) {
        if(this.controllerFor('application').get("currentPath") && this.controllerFor('application').get("currentPath") != "biller.settings.users.create"){
          if(model && model.get("length")>0){
            this.transitionTo("biller.settings.users.user", model.objectAt(0).get("id"));
          }
        }
      },

      _getUsers: function() {
        return this.store.query("user", {
          billerId: this.modelFor("biller").id
        });
      },

      setupController: function(controller, model) {
        this._super(controller, model);
        controller.set("biller", this.modelFor("biller"));
      },

      mfaActivationConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.userSettings.mfaActivateModalCancel, actionName: "cancel"}),
          App.ModelDialogActionButton.create({label: settingsStrings.all.userSettings.mfaActivateModalActivate, bsType: "btn-danger", actionName: "confirm"})],

      actions: {
        reloadData: function() {
          this.doRemoteAction(function() {
              return this._getUsers();
            },
            function(results) {
              this.controller.set("model", results);
            },
            "An error occurred while refreshing users for this biller. Please try again later.");
        },

        activateMfa: function() {
            var self = this;
            this.doRemoteAction(function() {
                    return Ember.$.post("/data/settings/users/mfa/activate", {
                        billerId: self.modelFor("biller").get("id")
                    });
                },
                function(results) {
                    if(results.success) {
                        this.showSuccessMessage(this.controller.get("strings.capitalised.mfaActivateSuccess"));
                        this.controller.set('biller.mfaRequired', true);
                        this.send('reloadData');
                    } else {
                        this.showErrorMessage(this.controller.get("strings.capitalised.mfaActivateFailed"));
                    }
                },
                this.controller.get("strings.capitalised.mfaActivateError"));
        },

        resetMfa: function(userId, uid) {
            var self = this;
            this.doRemoteAction(function() {
                    return Ember.$.post("/data/settings/users/mfa/reset", {
                        billerId: self.modelFor("biller").get("id"),
                        userId: userId
                    });
                },
                function(results) {
                    if(results.success) {
                        var route = this.container.lookup("route:biller.settings.users");
                        route.refresh();

                        this.showSuccessMessage(this.controller.get("strings.capitalised.mfaResetSuccess").fmt(uid));
                    } else {
                        this.showErrorMessage(this.controller.get("strings.capitalised.mfaResetFailed").fmt(uid));
                    }
                },
                this.controller.get("strings.capitalised.mfaResetError").fmt(uid));
        },

        showActivateMfaModal: function () {
            this.showModal("confirm-mfa-activation");
        }
      }
    });

    App.UserInvite = Ember.Object.extend({
      errors: [],

      validate: function() {
        this.get("errors").clear();

        var email = this.get("email") || "";
        if (!email.match(/\w+@\w+/)) {
          this.get("errors").pushObject("Please enter a valid email address.");
        }

        if (this.get("roleIds").length == 0) {
          this.get("errors").pushObject("Please select at least one role for the new user.");
        }

        return this.get("errors").length == 0;
      },

      isInvalid: Ember.computed("errors.[]", {
        get: function() {
          return this.get("errors").length > 0;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      roleIds: Ember.computed("registrationRole", "billsRole", "billerSettingsRole", "contactsRole", {
        get: function() {
          return [this.get("registrationRole.id"),
            this.get("billsRole.id"),
            this.get("billerSettingsRole.id"),
            this.get("contactsRole.id")
          ].compact();
        },
        set: function(key, newValue) {
          return newValue;
        }
      })
    });

    var withRoleDisplayName = function(strings) {
      return function(role) {
        if (role){
          Ember.set(role, "displayName", strings.get("capitalised.userSettings.roles")[role.id]);
        }
        return role;
      };
    };

    // App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
    //   linkTo: "biller.settings.users",
    //   name: "users",
    //   idx: 1
    // }));

    Ember.TEMPLATES['biller/settings/users'] = Ember.Handlebars.compile(settingsUsersTemplate);
    App.BillerSettingsUsersController = App.BillerSettingsSubControllerBase.extend({
      application:Ember.inject.controller(),
      billerSettings:Ember.inject.controller(),
      name: "users",

      strings: Ember.computed("billerSettings.strings", "biller", {
        get: function() {
          return this.get("billerSettings.strings");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      instructions: Ember.computed("strings", "biller", {
        get: function() {
          if (this.get("biller").get("systemId") === 'incoming-invoice') {
            return this.get("strings.capitalised.userSettings.payerInstructions");
          }
          return this.get("strings.capitalised.userSettings.instructions").fmt(this.get("model.billerName"));
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      hasContactsFeature: Ember.computed("biller", {
        get: function() {
          return this.get("biller").hasFeature("contacts");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),
      permissions: Ember.computed("application.permissions", {
        get: function() {
          return this.get("application.permissions");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isNotQboBiller: Ember.computed("application.userContext", {
          get: function() {
              var userid = this.get("application.userContext.username");
              if (userid.indexOf("@") < 0) {
                return false;
              }
              return true;
          },
          set: function(key, newValue) {
              return newValue;
          }
      }),

        billerDoesNotHaveSsoSamlEnabled: Ember.computed("biller", {
            get: function() {
                return this.get("biller").get("samlSsoEnabled") === false;
            }
        }),


        canUpdateUser: Ember.computed("application.userContext", {
        get: function() {
          return this.get("permissions") ?
                      this.get("permissions").includes("settings.biller.update.all") : false;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isPayreqUser: Ember.computed("application.userContext", {
        get: function() {
          var email = this.get("application.userContext.username");
          return email?(email.indexOf("@payreq.com") !== -1):false;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      allRoles: Ember.computed("biller", {
        get: function(){
          return this.get("store").peekAll("role");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      allContactRoles: Ember.computed("allRoles", "strings", {
          get: function() {
            var allRoles = this.get("allRoles");
            return this._getRolesForGrouping(allRoles, "contacts");
          },
          set: function(key, newValue) {
            return newValue;
          }
      }),

      allRegistrationRoles: Ember.computed("allRoles", "strings", {
        get: function() {
          var allRoles = this.get("allRoles");
          return this._getRolesForGrouping(allRoles, "registration");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      allBillRoles: Ember.computed("allRoles", "strings", {
        get: function() {
          var allRoles = this.get("allRoles");
          return this._getRolesForGrouping(allRoles, "bills");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      allBillerSettingRoles: Ember.computed("allRoles", "strings", {
        get: function() {
          var allRoles = this.get("allRoles");
          return this._getRolesForGrouping(allRoles, "biller-settings");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      allPayreqRoles: Ember.computed("allRoles", "strings", {
        get: function() {
          var allRoles = this.get("allRoles");
          return this._getRolesForGrouping(allRoles, "payreq");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      filterIncoming: function (item) {
          return item.get("name").indexOf('Incoming') == 0;
      },

      filterNotIncoming: function (item) {
          return !(item.get("name").indexOf('Incoming') == 0);
      },

      _getRolesForGrouping: function(allRoles, grouping){
        var roles = allRoles.filterBy("grouping", grouping);
        roles= roles.map(withRoleDisplayName(this.get("strings")));
        //fitler for incoming roles
        if(this.get("biller.systemId") === "incoming-invoice" && (grouping === "biller-settings" || grouping === "registration" || grouping == "bills")) {
          roles = roles.filter(this.filterIncoming);
        }
        //filter for non-incoming roles
        if(this.get("biller.systemId") != "incoming-invoice" && grouping != "payreq"){
          roles = roles.filter(this.filterNotIncoming);
        }

        return roles;
      },

      childBillers: Ember.computed("biller", {
        get: function(key, value){
          return this.get("store").peekAll("childBiller").filterBy("customerId", this.get("biller").get("customerId"));
        },

        set: function(key, newValue) {
          return newValue;
        }
      }),

      hasChildBillers: Ember.computed("childBillers", {
        get: function(key, value) {
          return this.get("childBillers").get("length")>1;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      _isValidPhoneNumber:function(phoneNumber){
        if(!phoneNumber){
          return false;
        }
        if(/^[0-9\+][0-9 \-]*[0-9]$/.test(phoneNumber)){
           var digits = phoneNumber.replace("+", "").replace(/ /g,"").replace(/-/g,"");
           if(digits.length < 8 || digits.length > 12){
            return false;
           }
           return true;
        }
        return false;
      },

      actions: {
          activateMfaAction: function() {
              this.send("activateMfa");
          },
      }
    });

    Ember.TEMPLATES['confirm-revoke-all-access'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\""+settingsStrings.all.userSettings.revokeModalHeading+"\" actionButtons=revokeAllAccessConfirmActionButtons " +
    																																				"onClose=\"closeModal\" confirm=\"revokeAllAccessAction\"}}" +
    																																				settingsStrings.all.userSettings.revokeModalText +
    																																				"{{/modal-dialog}}");

    App.BillerSettingsUsersUserRoute = App.SettingsSubRouteBase.extend(App.RouteWithRemoteActionsMixin, {
      model: function(params){
        return Ember.$.get("/data/users/%@".fmt(params.userId), {billerId: this.modelFor("biller").id});
      },

      afterModel: function(model){
        this.store.peekAll("user").setEach("active", false);
        if(model.user && model.user.id){
          this.store.peekRecord("user", model.user.id).set("active", true);
        }

        var user = model.user;
        if(!user || !user.id){
           this.transitionTo("biller.settings.users", this.modelFor("biller").get("id"));
        }
      },

      setupController: function(controller, model) {
        this._super(controller, model);
        controller.set("biller", this.modelFor("biller"));

        model.settings.forEach(function (setting){
          Ember.set(setting, "displayDescription", controller.get("strings.userSettings.notificationPreferenceDescription")[setting.name]);
        });
      },

      actions:{
        saveUser: function(storeUser){
          this.doRemoteAction(function () {
                return storeUser.save();
              },
              function (results) {
                this.showSuccessMessage(this.controller.get("userStrings.savedUser"));
              },
              function (results) {
                this.showErrorMessage(this.controller.get("userStrings.savedUserUnsuccessful"));
                storeUser.rollbackAttributes();

              });
        },

        resendInvite: function(user) {
          var self = this;
          this.doRemoteAction(function() {
              return Ember.$.post("/data/settings/resend-invite", {
                userId: user.id,
                billerId: self.modelFor("biller").get("id")
              });
            },
            function(results) {
              if(results.success) {
                this.showSuccessMessage(this.controller.get("userStrings.resendInviteSuccessful").fmt(user.email));
              } else {
                this.showErrorMessage(results.error);
              }
              //this.send("reloadData");
            },
              this.controller.get("userStrings.resendInviteFailed"));
        },

        revokeAllAccess:function(user){
          this.doRemoteAction(function() {
            var biller = this.modelFor("biller");
            return Ember.$.post("/data/settings/revoke-all-access", {
              userId: user.id,
              billerId: biller.get("id")
            });
          },
          function(results) {
            this.showSuccessMessage(this.controller.get("userStrings.revokeAccessSuccess").fmt(user.email));
            var route = this.container.lookup("route:biller.settings.users");
            route.refresh();
            var users = this.modelFor("biller.settings.users");
            if(users && users.get("length")>0){
              this.transitionTo("biller.settings.users.user", users.objectAt(0).get("id"));
            }
          },
              this.controller.get("userStrings.revokeAccessFailed"));
        },

        updateUserCustomerRole:function(user, currentRole, newRole){
          this.doRemoteAction(function() {
            var biller = this.modelFor("biller");
            var currentRoleId = currentRole?parseInt(currentRole.id):null;
            var newRoleId = newRole?parseInt(newRole.id):null;
            return Ember.$.post("/data/settings/update-user-customer-actor-role", {
              userId: user.id,
              billerId: biller.get("id"),
              currentRoleId: currentRoleId,
              newRoleId: newRoleId
            });
          },
          function(results) {
            this.showSuccessMessage(this.controller.get("userStrings.updateRoleSuccessful"));
          },
              this.controller.get("userStrings.updateRoleFailed"));
        },

        updateNotifications: function(settings, user) {
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
            return Ember.$.post("/data/settings/notification-prefs", {notificationPrefs: settings,
                                                                      userId:user.id,
                                                                      billerId: this.modelFor("biller").id});
          },
          function(results) {
            this.showSuccessMessage(this.controller.get("userStrings.updateNotificationSuccessful"));
          },
              this.controller.get("userStrings.updateNotificationFailed"));
        }

      }

    });

    Ember.TEMPLATES['biller/settings/users/user'] = Ember.Handlebars.compile(settingsUsersUserTemplate);
    App.BillerSettingsUsersUserController = App.BillerSettingsSubControllerBase.extend(
      App.ModalProducingControllerMixin,{
      application: Ember.inject.controller(),
      billerSettings: Ember.inject.controller(),
      billerSettingsUsers: Ember.inject.controller(),
      name: "users",
      userStrings: settingsStrings.all.userSettings,

      showNotificationTab: Ember.computed("biller", "strings", {
        get: function() {
          return this.get("biller").get("product") !== "Payreq Inbox";
        }
      }),

      isPayreqInbox: Ember.computed("billerSettings.biller", {
          get: function() {
              return this.get("biller").get("systemId") === 'incoming-invoice';
          },
      }),

      canUpdateUser: Ember.computed("application.entityContext", {
        get: function() {
          return this.get("billerSettingsUsers.canUpdateUser");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      cannotUpdateUser: Ember.computed("canUpdateUser", {
        get: function() {
          return !this.get("canUpdateUser");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isNotLoginUser: Ember.computed("model.user", "application.userContext", {
        get: function() {
          return !(this.get("application.userContext.username") == this.get("model.user.email"));
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      billerDoesNotHaveSsoSamlEnabled: Ember.computed("biller", {
          get: function() {
            return this.get("biller").get("samlSsoEnabled") === false;
          }
      }),

      canEditPermission: Ember.computed("cannotUpdateUser", "isNotLoginUser", {
        get: function() {
          return (this.get("canUpdateUser") && this.get("isNotLoginUser") && this.get("billerDoesNotHaveSsoSamlEnabled"));
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      strings: Ember.computed("billerSettings.strings", {
        get: function() {
          return this.get("billerSettings.strings");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      frequencies: Ember.computed({
        get: function() {
          return [
            {id: "never", name: this.get("strings.userSettings.notificationPreferenceValues.never")},
            {id: "immediate", name: this.get("strings.userSettings.notificationPreferenceValues.immediate")},
            {id: "frequent", name: this.get("strings.userSettings.notificationPreferenceValues.frequent")},
            {id: "infrequent", name: this.get("strings.userSettings.notificationPreferenceValues.infrequent")}];
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      alertTypes: Ember.computed({
        get: function() {
          return [{id: "email", name: "Email"}];
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isPending: Ember.computed("model.user", {
        get: function() {
          return this.get("model.user.status") == "pending";
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      statusDisplay: Ember.computed("model.user.status", {
        get: function() {
          return this.get("strings.userSettings.statusList")[this.get("model.user.status")];
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      customerName: Ember.computed("application.entityContext", {
        get: function() {
          return this.get("application.entityContext.customerName");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      payreqRole: Ember.computed("model.user.userRoles.[]", {
        get: function(key, value) {
          return this._getRoleForGrouping("payreq");
        },
        set: function(key, newValue) {
          this._updateUserCustomerRole(this.get("payreqRole"), newValue);
          return newValue;
        }
      }),

      contactRole: Ember.computed("model.user.userRoles.[]", {
        get: function(key, value) {
          return this._getRoleForGrouping("contacts");
        },
        set: function(key, newValue) {
          this._updateUserCustomerRole(this.get("contactRole"), newValue);
          return newValue;
        }
      }),

      registrationRole: Ember.computed("model.user.userRoles.[]", {
        get: function(key, value) {
          return this._getRoleForGrouping("registration");
        },
        set: function(key, newValue) {
          this._updateUserCustomerRole(this.get("registrationRole"), newValue);
          return newValue;
        }
      }),

      billRole: Ember.computed("model.user.userRoles.[]", {
        get: function(key, value) {
          return this._getRoleForGrouping("bills");
        },
        set: function(key, newValue) {
          this._updateUserCustomerRole(this.get("billRole"), newValue);
          return newValue;
        }
      }),

      billerSettingRole: Ember.computed("model.user.userRoles.[]", {
        get: function(key, value) {
          return this._getRoleForGrouping("biller-settings");
        },
        set: function(key, newValue) {
          this._updateUserCustomerRole(this.get("billerSettingRole"), newValue);
          return newValue;
        }
      }),

      passwordEvents: Ember.computed("model.passwordEvents.[]", "model.passwordEvents", {
        get: function(key, value) {
          var self = this;
          this.get("model.passwordEvents").map(function(event){
            event.eventTypeDescription = self.get("strings.userSettings.passwordEvents.eventList")[event.eventType];
          });
          return this.get("model.passwordEvents");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      _getRoleForGrouping: function(grouping){
        var roles =  this.get("model.user.userRoles")?this.get("model.userRoles").filterBy("grouping", grouping):[];
        if(roles && roles.length>0){
          return withRoleDisplayName(this.get("strings"))(this.store.peekRecord("role", roles.objectAt(0).role));
        }
        return null;
      },

      _validateUser: function(user) {
        this.removeErrors("#update-user-form");

        var errors = false;

        if (this.get("biller").get("systemId") !== 'incoming-invoice' && String.isBlank(user.workPhoneNumber)){
          this.errorOnField("#workPhoneNumber", this.get("strings.userSettings.workPhoneNumberMissing"));
          errors = true;
        }else if (this.get("biller").get("systemId") !== 'incoming-invoice' && !this.get("billerSettingsUsers")._isValidPhoneNumber(user.workPhoneNumber)){
          this.errorOnField("#workPhoneNumber", this.get("strings.userSettings.invalidPhoneNumber"));
          errors = true;
        }

        if (!String.isBlank(user.mobileNumber) && !this.get("billerSettingsUsers")._isValidPhoneNumber(user.mobileNumber)){
          this.errorOnField("#mobileNumber", this.get("strings.userSettings.invalidPhoneNumber"));
          errors = true;
        }

        if (String.isBlank(user.name)){
          this.errorOnField("#userName", this.get("strings.userSettings.userNameMissing"));
          errors = true;
        }

        if (user.name && user.name.length > 255) {
          this.errorOnField("#userName", this.get("strings.userSettings.userNameMax"));
          errors = true;
        }

        if (user.notes && user.notes.length > 1999) {
          this.errorOnField("#notes", this.get("strings.userSettings.notesMax"));
          errors = true;
        }

        return !errors;
      },

      _updateUserCustomerRole: function(currentRole, newRole){
          this.send("updateUserCustomerRole", this.get("model").user, currentRole, newRole);
      },

      revokeAllAccessConfirmActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.userSettings.revokeModalCancelButton, actionName: "cancel"}),
      																	 App.ModelDialogActionButton.create({label: settingsStrings.all.userSettings.revokeModalSubmitButton, bsType: "btn-danger", actionName: "confirm"})],

      actions:{
        saveUserAction: function(user, billerId){
          if(this._validateUser(user)){
            var storeUser = this.store.peekRecord("user", user.id);

            Ember.set(storeUser, "billerId", billerId);
            Ember.set(storeUser, "name", user.name);
            Ember.set(storeUser, "workPhoneNumber", user.workPhoneNumber);
            Ember.set(storeUser, "mobileNumber", user.mobileNumber);
            Ember.set(storeUser, "notes", user.notes);

            this.send("saveUser", storeUser);
          }
        },

        resend:function(user) {
          this.send('resendInvite', user);
        },

        promptRevokeAllAccess: function(user, customerId) {
          user.customerId = customerId;
          this.set("revokeAllAccessUser", user);
          this.showModal("confirm-revoke-all-access");
        },

        revokeAllAccessAction: function() {
          this.send("revokeAllAccess", this.get("revokeAllAccessUser"));
        },

        copyPasswordResetLink: function(user){
          var text = user.passwordResetHref;
          if (window.clipboardData && window.clipboardData.setData) {
              // IE specific code path to prevent textarea being shown while dialog is visible.
              clipboardData.setData("Text", text);

          } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
              var textarea = document.createElement("textarea");
              textarea.textContent = text;
              textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
              document.body.appendChild(textarea);
              textarea.select();
              try {
                  document.execCommand("copy");  // Security exception may be thrown by some browsers.
              } catch (ex) {
                  console.warn("Copy to clipboard failed.", ex);
              } finally {
                  document.body.removeChild(textarea);
              }
          }
        }
      }
    });

    App.BillerSettingsUsersCreateRoute = App.SettingsSubRouteBase.extend(App.RouteWithRemoteActionsMixin, {
      model: function(params){
          return Ember.$.get("/data/settings/invite-billers", {billerId: this.modelFor("biller").id,
                                                              customerId: this.modelFor("biller").get("customerId")});
      },

      afterModel:function(model){
        this.store.peekAll("user").setEach("active", false);
      },

      setupController: function(controller, model) {
        this._super(controller, model);
        controller.set("model", model);
        controller.set("biller", this.modelFor("biller"));

        var baseFilters = {
            billStatus: model.selected
        };

        controller.setBaseFilters(baseFilters);
      },

      actions:{
        createUser: function(user, billerId, roles) {
          this.doRemoteAction(function() {
              return Ember.$.post("/data/settings/invite-user", {
                email: user.email,
                name: user.name,
                workPhoneNumber: user.workPhoneNumber,
                mobileNumber: user.mobileNumber,
                notes: user.notes,
                language: user.language || "en",
                billerId: billerId,
                userRoleIds: roles,
                billersToAdd: this.controller.get("selectedFilters.billStatus"),
              });
            },
            function(results) {
              if(results.success) {
                var msg = "";
                if (results.existingUser) {
                  msg = this.controller.get("userStrings.inviteExistingUserSuccess").fmt(user.email);
                } else {
                  msg = this.controller.get("userStrings.inviteNewUserSuccess").fmt(user.email);
                }
                this.showSuccessMessage(msg);
                var route = this.container.lookup("route:biller.settings.users");
                route.refresh();
                this.transitionTo("biller.settings.users.user", results.userId);
              } else {
                this.showErrorMessage(this.controller.get("userStrings.inviteUnsuccessful"));
              }
            },
              this.controller.get("userStrings.inviteUserFailed"));
        },
      }
    });

    Ember.TEMPLATES['biller/settings/users/create'] = Ember.Handlebars.compile(settingsUsersCreateTemplate);
    App.BillerSettingsUsersCreateController = App.BillerSettingsSubControllerBase.extend(App.TabularDataController,{
      application: Ember.inject.controller(),
      billerSettings: Ember.inject.controller(),
      billerSettingsUsers: Ember.inject.controller(),
      name: "users",
      payreqRole: "10",
      contactRole: null,
      registrationRole: null,
      billRole: null,
      billerSettingRole: null,
      billersToAddPlaceholder: settingsStrings.all.userSettings.billersToAddPlaceholder,
      languages: [
        {id: "en", name: settingsStrings.all.userSettings.languages.en},
        {id: "fr", name: settingsStrings.all.userSettings.languages.fr},
      ],
      userStrings: settingsStrings.all.userSettings,

      permissionError: Ember.computed("billerSettings.biller", {
        get: function() {
          return null;
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      isPayreqInbox: Ember.computed("billerSettings.biller", {
          get: function() {
              return this.get("biller").get("systemId") === 'incoming-invoice';
          },
      }),
      canUpdateUser: Ember.computed("application.entityContext", {
        get: function() {
          return this.get("billerSettingsUsers.canUpdateUser");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      cannotUpdateUser: Ember.computed("canUpdateUser", {
        get: function() {
          return !this.get("canUpdateUser");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      strings: Ember.computed("billerSettings.strings", {
        get: function() {
          return this.get("billerSettings.strings");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),


      customerName: Ember.computed("application.entityContext", {
        get: function() {
          return this.get("application.entityContext.customerName");
        },
        set: function(key, newValue) {
          return newValue;
        }
      }),

      _validateUser: function(user) {
        this.removeErrors("#create-user-form");

        var errors = false;

        var email = user.email || "";
        if (!email.match(/\w+@\w+/)){
          this.errorOnField("#email", this.get("strings.userSettings.emailMissing"));
          errors = true;
        }

        if (String.isBlank(user.name)){
          this.errorOnField("#userName", this.get("strings.userSettings.userNameMissing"));
          errors = true;
        }

        if (this.get("biller").get("systemId") !== 'incoming-invoice' && String.isBlank(user.workPhoneNumber)){
          this.errorOnField("#workPhoneNumber", this.get("strings.userSettings.workPhoneNumberMissing"));
          errors = true;
        }else if (this.get("biller").get("systemId") !== 'incoming-invoice' && !this.get("billerSettingsUsers")._isValidPhoneNumber(user.workPhoneNumber)){
          this.errorOnField("#workPhoneNumber", this.get("strings.userSettings.invalidPhoneNumber"));
          errors = true;
        }

        if (!String.isBlank(user.mobileNumber) && !this.get("billerSettingsUsers")._isValidPhoneNumber(user.mobileNumber)){
          this.errorOnField("#mobileNumber", this.get("strings.userSettings.invalidPhoneNumber"));
          errors = true;
        }

        return !errors;
      },

      // at the time of creation user should be assigned at least one role from contact roles, registration roles and bill role
      _validatePermission: function(){
        if(this.get("billerSettingsUsers.hasContactsFeature")){
          if(!this.get("contactRole") && !this.get("registrationRole") && !this.get("billRole")){
            Ember.set(this, "permissionError", this.get("strings.userSettings.permissionError")
                                                    .fmt(this.get("strings.userSettings.permissions.contacts") + ", " +
                                                         this.get("strings.userSettings.permissions.registrations") + " and "+
                                                         this.get("strings.userSettings.permissions.bills")));
            return false;
          }
        }else{
          if(!this.get("registrationRole") && !this.get("billRole")){
            Ember.set(this, "permissionError", this.get("strings.userSettings.permissionError")
                                                    .fmt(this.get("strings.userSettings.permissions.registrations") + " and "+
                                                         this.get("strings.userSettings.permissions.bills")));
            return false;
          }
        }
        return true;
      },

      actions:{
        createUserAction: function(user, billerId){
          if(this._validateUser(user) && this._validatePermission()){
            var roles = [];
            roles.push(parseInt(this.get("payreqRole")));
            if(this.get("contactRole")){
              roles.push(parseInt(this.get("contactRole")));
            }
            if(this.get("registrationRole")){
              roles.push(parseInt(this.get("registrationRole")));
            }
            if(this.get("billRole")){
              roles.push(parseInt(this.get("billRole")));
              if(this.biller.get("systemId") === "incoming-invoice"){
                  roles.push(103);// jobs role for MyBills so they can download bills
              }
            }
            if(this.get("billerSettingRole")){
              roles.push(parseInt(this.get("billerSettingRole")));
            }

            this.send("createUser", user, billerId, roles);
          }
        }
      }
    });

  });
