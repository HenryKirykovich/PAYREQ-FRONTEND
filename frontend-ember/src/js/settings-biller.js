define(['text!templates/settings-biller.html',
      'text!templates/settings-biller-channel.html',
      'text!templates/settings-biller-manual.html',
      'text!templates/settings-biller-saasu.html',
      'text!templates/settings-biller-qbo-payroll.html',
      'text!templates/bill-template-upload-modal.html',
      'application', 'settings', 'billers', 'form-helper', 'tabular-data-helper'],
    function (billerSettingsTemplate,
              billerSettingsChannelTemplate,
              billerSettingsManualTemplate,
              billerSettingsSaasuTemplate,
              billerSettingsQboPayrollTemplate,
              billTemplateUploadModal) {

        var attr = DS.attr;

        App.Channel = DS.Model.extend({
            billerId: attr(),
            channelPartnerSystemId: attr(),
            requiresSelfservice: attr("boolean"),
            extBillerId: attr(),
            extBillerName: attr(),
            checkPayerCred: attr("boolean"),
            useAuthItem1: attr("boolean"),
            useAuthItem2: attr("boolean"),
            useAuthItem3: attr("boolean"),
            useAuthItem4: attr("boolean"),
            registrationContactIdField: attr(),
            registrationContactIdHelp: attr(),
            authItem1Field: attr(),
            authItem2Field: attr(),
            authItem3Field: attr(),
            authItem4Field: attr(),
            authItem1Value: attr(),
            authItem2Value: attr(),
            authItem3Value: attr(),
            authItem4Value: attr(),
            authItem1Help: attr(),
            authItem2Help: attr(),
            authItem3Help: attr(),
            authItem3Help: attr(),
            emailBillDeliveryType: attr(),
            emailBillFrom: attr(),
            emailBillTo: attr(),
            emailBillContact: attr(),
            emailBillNoticeType: attr(),
            emailMarkEachAsFailed: attr("boolean"),
            emailTemplate: attr(),
            emailTemplateText: attr(),
            defaultEmailTemplateBrandColour: attr(),
            emailTemplateType: attr(),
            maxNoDetails: attr(),

        });



      App.BillerSettingsBillerRoute = App.SettingsSubRouteBase.extend({
        model: function () {
          var biller = this.modelFor("biller");
          return Ember.$.get("/data/settings/biller", {billerId: biller.id}).then(function (resp) {
            App.billerSettings = resp.billerSettings;
            return resp.billerSettings;
          });
        },

        redirect: function(model, transition) {
          if(this.controllerFor('application').get("currentPath")){
              if(model && model.billerChannelPartnerSystem.get("length")>0){
                  this.transitionTo("biller.settings.biller.channel", model.billerChannelPartnerSystem.objectAt(0).channelPartnerSystemId);
              }
          }
        },

        setupController: function (controller, model) {

          this._super(controller, model);
            controller.set("hasContactsFeature", this.modelFor("biller").hasFeature("contacts"));
            controller.set("biller", this.modelFor("biller"));

            if(model.systemId === "incoming-invoice") {
                //this.set("name", "users");
                window.location.href = "/portal/customer/biller/" + this.modelFor("biller").id + "/settings/connections/view";
                return;
            }
        },

        actions: {
          update: function (model, billerId) {
            this.doRemoteAction(function () {
                  var settings = Ember.Object.create(model);
                  return Ember.$.post("/data/settings/biller",
                      {
                        billerId: billerId,
                        billerSettings: settings.getProperties("authItem1Field", "authItem2Field",
                            "authItem3Field", "authItem4Field", "checkPayerCred",
                            "reviewFailedReg", "reviewBillBeforeSending", "saveBillWithoutRegistration",
                            "dueDateReplacementWords", "userId", "secret", "systemId", "noPaymentRequiredReplacementWord",
                            "checkPotentialDeregistration", "holdContactChangedBill",
                            "useAuthItem1", "useAuthItem2", "useAuthItem3", "useAuthItem4",
                            "contactRequiredForRegistationApproval",
                            "mandatoryCheckOnDocumentSize", "allowAgentRegistrationsFromContacts",
                            "validateCustomerName", "noUploadPotentialDeregistration", "validatePageSize")
                      });
                },
                function (results) {
                    if (results.success) {
                      var route = this.container.lookup("route:biller");
                      route.refresh();
                      this.showSuccessMessage(this.controller.get("strings.billerSettings.mailerOptionsUpdated"));
                    } else {
                        var errorMessage = this.controller.get("strings.billerSettings." + results.errorMessage);
                        this.showErrorMessage(errorMessage === null ? this.controller.get("strings.billerSettings.mailerOptionsUpdateFailed") : errorMessage)
                    }

                },
                this.controller.get("strings.billerSettings.mailerOptionsUpdateFailed"));
          },

        updateContactFields: function (model, billerId) {
            this.doRemoteAction(function () {
                    var settings = Ember.Object.create(model);
                    return Ember.$.post("/data/settings/biller/contact-fields",
                        {
                            billerId: billerId,
                            billerSettings: settings.getProperties("userId", "secret", "systemId",
                                "contactId1Field", "contactId2Field", "contactId3Field", "contactId4Field",
                                "contactId5Field", "contactId6Field", "contactId7Field", "contactId8Field")
                        });
                },
                function (results) {
                    var route = this.container.lookup("route:biller");
                    route.refresh();
                    this.showSuccessMessage(this.controller.get("strings.billerSettings.contactFieldsUpdated"));
                },
                this.controller.get("strings.billerSettings.contactFieldsUpdateFailed"));
          },

            updateBillFields: function (model, billerId) {
                this.doRemoteAction(function () {
                        var settings = Ember.Object.create(model);
                        return Ember.$.post("/data/settings/biller/bill-fields",
                            {
                                billerId: billerId,
                                billerSettings: settings.getProperties("userId", "secret", "systemId",
                                    "billRef1Field", "billRef2Field", "billRef3Field", "billRef4Field",
                                    "billRef5Field", "billRef6Field")
                            });
                    },
                    function (results) {
                        var route = this.container.lookup("route:biller");
                        route.refresh();
                        this.showSuccessMessage(this.controller.get("strings.billerSettings.billFieldsUpdated"));
                    },
                    this.controller.get("strings.billerSettings.billFieldsUpdateFailed"));
            },

          generateIncomingBillsEmailAddress: function (model) {
            this.doRemoteAction(function () {
                  return Ember.$.post("/data/settings/biller/%@/generate-biller-email".fmt(model.actorId));
                },
                function (resp) {
                  this.showSuccessMessage("Mailer email address has been generated.");
                  this.controller.set("model.incomingBillsEmailAddressFull", resp.generatedEmail);
                },
                "An error occurred while generating the biller email address. Please try again later.");
          },

          refresh: function() {
            this.refresh();
          },

          disconnectQboAccount: function(qboAuth) {
            this.doRemoteAction(function () {
                  return Ember.$.ajax({type: "PUT", url: "/data/settings/qbo/disconnect/%@".fmt(qboAuth.id)});
                },
                function (resp) {
                  this.showSuccessMessage(this.controller.get("strings.billerSettings.qboDisconnected"));
                  var route = this.container.lookup("route:biller");
                  route.refresh();
                },
                this.controller.get("strings.billerSettings.qboDisconnectFailed"));
          }
        }
      });


      Ember.TEMPLATES['biller/settings/biller'] = Ember.Handlebars.compile(billerSettingsTemplate);
      App.BillerSettingsBillerController = App.BillerSettingsSubControllerBase.extend({
        application: Ember.inject.controller(),
        billerSettings: Ember.inject.controller(),
        name: "biller",

        showCheckCustomerName: Ember.computed("model", {
            get: function () {
                return this.get("model").hasSizePricing || this.get("biller.channelPartnerSystemId")==="epost";
            }
        }),

        showSaveBillWithoutRegistration: Ember.computed("model", {
          get: function () {
              return !(this.get("model").sendNonDigitalToPrinter || this.get("model").ignoreNonDigital);
          }
        }),

        systemComponentName: Ember.computed("model", {
          get: function () {
            //hack to default active to first channel
            $(".settings-channel").first().addClass('active');

            var systemId = this.get("model").systemId;
            return (systemId ? "settings-biller-" + systemId : null);
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        hasAllAccess: Ember.computed({
          get: function () {
            var permissions = this.get("application.permissions");
            return permissions.includes("settings.biller.view.all");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        hasUpdateAccess: Ember.computed({
          get: function () {
            var permissions = this.get("application.permissions");
            return permissions.includes("settings.biller.update.all") || permissions.includes("settings.biller.update.no-access");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        allowChangeCheckCredentials: Ember.computed("hasContactsFeature", {
          get: function () {
            return !this.get("hasContactsFeature");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        sendsPayrollDocuments: Ember.computed("model", {
          get: function () {
              var channels = this.get("model.billerChannelPartnerSystem").filter(function (e) {
                  return e.channelPartnerSystemId === "epost" || e.channelPartnerSystemId === "mybills";
              });

              return channels.length !== 0;
          }
        }),
        checkPageSizeMessage: Ember.computed("model.checkMaxPageSize", {
            get: function () {
                return this.get("strings.billerSettings.checkMaxDocumentPagesMsg").fmt(this.get("model.checkMaxPageSize"));
            }
        }),


        allowPendingFailedRegistrations: Ember.computed("biller", {
          get: function () {
            return this.get("biller").hasFeature("failed-registrations");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),


        isAdmin: Ember.computed("biller", {
          get: function () {
              return this.get("model.isPayreqAdmin");
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        getMeta : function(){
          return this.get("model.meta");
        },

        channelIdFields: Ember.computed("model", {
          get: function() {
              return this.getMeta().channelIdFields;
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField1Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-1");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField2Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-2");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField3Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-3");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField4Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-4");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField5Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-5");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField6Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-6");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField7Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-7");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField8Id: Ember.computed("model", {
          get: function() {
              return this.get("channelIdFields").contains("contact-id-8");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        authFields: Ember.computed("model", {
          get: function() {
              return this.getMeta().authFields;
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField1Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-1");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField2Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-2");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField3Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-3");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField4Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-4");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField5Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-5");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField6Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-6");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField7Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-7");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        isContactField8Auth: Ember.computed("model", {
          get: function() {
              return this.get("authFields").contains("contact-id-8");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),

        strings: Ember.computed("billerSettings.strings", {
          get: function () {
            return this.get("billerSettings.strings");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        disableCheckPotentialDeregistration: Ember.computed("model.hasPotentialDeregister", "model.checkPotentialDeregistration", {
          get: function () {
            return this.get("model.hasPotentialDeregister") && this.get("model.checkPotentialDeregistration");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),
      //language: 'English',
      //languages: [{name: 'English', notName: 'contact-id-1', selected: true}, {name: 'Non English', notName:'contact-id-2', selected: false}],


        //  actions: {
        //      selectVehicle: function(language) {
        //          channel.authItem1Field = language;
        //          this.set('language', language);
        //      }
        //  }

      });

        App.BillerSettingsBillerChannelRoute = App.SettingsSubRouteBase.extend(App.RouteWithRemoteActionsMixin, {
            model: function (params) {
                return Ember.$.get("/data/settings/biller/channel/%@".fmt(params.channelPartnerSystemId), {billerId: this.modelFor("biller").id});
            },

            afterModel: function(model){
                var channel = model.channel;
                if(!channel || !channel.channelPartnerSystemId){
                    this.transitionTo("biller.settings.biller.channel", "bpv");
                }

                $(".settings-channel").removeClass('active');
                $("#" + channel.channelPartnerSystemId).addClass('active');
            },

            setupController: function (controller, model) {
                this._super(controller, model);
                controller.set("biller", this.modelFor("biller"));
                controller.set("model", model);

                if(model.channel.channelPartnerSystemId  ===  "email" && model.channel.emailBillDeliveryType  === null){
                    controller.set("model.channel.emailBillDeliveryType", 1); //default to  with attachment
                }
            },

            actions: {
                saveChannelAction: function (channel, billerId) {
                    this.doRemoteAction(function () {
                            //var settings = Ember.Object.create(model);
                            var settingsChannel = Ember.Object.create(channel);

                            return Ember.$.post("/data/settings/biller/channel",
                                {
                                    billerId: billerId,
                                    channel: settingsChannel.getProperties("channelPartnerSystemId", "authItem1Value", "authItem2Value",
                                        "authItem3Value", "authItem4Value", "checkPayerCred",
                                        "userId", "secret",
                                        "useAuthItem1", "useAuthItem2", "useAuthItem3", "useAuthItem4",
                                        "contactRequiredForRegistationApproval",
                                        "registrationContactIdHelp", "authItem1Help", "authItem2Help", "authItem3Help", "authItem4Help",
                                        "emailBillDeliveryType", "emailBillFrom", "emailBillTo", "emailBillNoticeType", "emailBillContact",
                                        "emailMarkEachAsFailed", "emailTemplate", "emailTemplateType", "emailTemplateText",
                                        "defaultEmailTemplateBrandColour", "agentNoticeIdContactIdField")
                                });
                        },
                        function (results) {
                            this.transitionTo("biller.settings.biller.channel", channel.channelPartnerSystemId);
                            this.showSuccessMessage("Channel settings updated successfully.");
                        },
                        "An error occurred while updating biller settings. Please try again later.");
                },

                sendTestEmail: function(billerId){
                    this.doRemoteAction(function () {

                            return Ember.$.post("/data/settings/biller/email/test",
                                {
                                    billerId: billerId
                                });
                        },
                        function (results) {
                            if(results.success) {
                                this.showSuccessMessage("A test email has been sent successfully.");
                            } else {
                                this.showErrorMessage(results.error)
                            }
                        },
                        "An error occurred sending a test email. Please try again later.");
                },

                downloadEmailTemplate: function(billerId){
                    this.doRemoteAction(function () {
                            return Ember.$.get("/data/emailTemplates/download", {billerId: billerId});
                        },
                        function (results) {
                            window.open(this.controller.get("downloadUrl") + "downloadFileId" + results.downloadFileId);
                            this.showSuccessMessage("Successful downloaded email template.");
                        },
                        "An error occurred downloading an email template. Please try again later.");

                },

                createBillTemplate: function(uploadedInfo, templateName) {
                    var self = this;
                    this.doRemoteAction(function() {
                            return Ember.$.post("/data/emailTemplates/create",
                                {billerId: this.modelFor("biller").get("id"),
                                    name: templateName,
                                    fileName: uploadedInfo.fileName,
                                    documentId: uploadedInfo.documentId});
                        },
                        function(results) {
                            self.refresh();
                            this.showSuccessMessage("Your new email template has been uploaded. Please sent a test invoice email. "+
                                "If you have any queries, contact us at support@payreq.com");
                        },
                        "An error occurred while uploading an email template for this mailer. Please try again later.");
                },
            }
        });

    Ember.TEMPLATES['bill-template-upload-modal'] = Ember.Handlebars.compile(billTemplateUploadModal);
    App.BillTemplateUploadMixin = Ember.Mixin.create({
        application: Ember.inject.controller(),
        uploadedInfo: null,
        templateName: null,
        uploading:false,
        fileName:"",

        uploadActionButtons: [App.ModelDialogActionButton.create({label: "Cancel", actionName: "cancel"}),
            App.ModelDialogActionButton.create({
                label: "Upload template", primary: true,
                bsType: "btn-primary", actionName: "confirm"
            })],

        billTemplateUploadUrl: Ember.computed("biller",{
            get: function() {
                return "/data/emailTemplates/%@/upload".fmt(this.get("biller").id);
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),

        isPrimaryDisabled: Ember.computed('uploadedInfo', 'templateName', function() {
            return (this.get("uploadedInfo")==null || String.isBlank(this.get("templateName")));
        }),

        clear: function() {
            this.set('templateName', null);
            this.set('uploadedInfo', null);
        },

        actions: {
            uploadBillTemplate: function () {
                this.showModal("bill-template-upload-modal");
            },

            createBillTemplateAction: function(){
                if(this.get("uploadedInfo") && this.get("templateName")){
                    this.send("createBillTemplate", this.get("uploadedInfo"), this.get("templateName"));
                    this.clear();
                }
            },
        }
    });

      Ember.TEMPLATES['biller/settings/biller/channel'] = Ember.Handlebars.compile(billerSettingsChannelTemplate);
      App.BillerSettingsBillerChannelController = App.BillerSettingsSubControllerBase.extend(App.ModalProducingControllerMixin, App.BillTemplateUploadMixin, {
          application: Ember.inject.controller(),
          billerSettings: Ember.inject.controller(),
          billerSettingsBiller: Ember.inject.controller(),
          name: "biller",
          downloadUrl : "/download/emailTemplate/download?",

          getMeta : function(){
              return this.get("model.meta");
          },

          contactFieldsSelect: Ember.computed({
              get: function() {
                  return this.getMeta().contactIdFields;
              },
              set: function(key, newValue) {
                  return newValue;
              }

          }),

          emailTypes: Ember.computed({
              get: function() {
                  return [{id: 1, name: "Email With Attachment"}];
              },
              set: function(key, newValue) {
                  return newValue;
              }

          }),

          emailTemplateTypes: Ember.computed({
              get: function() {
                  return [{id: 1, name: "Default"}, {id: 2, name: "Custom"}, {id: 3, name: "Provided in SFTP document load"}];
              },
              set: function(key, newValue) {
                  return newValue;
              }

          }),

          strings: Ember.computed("billerSettings.strings", {
              get: function () {
                  return this.get("billerSettings.strings");
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isEmail: Ember.computed("model.channel", {
              get: function () {
                  return this.get("model.channel.channelPartnerSystemId") === "email";
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isAgent: Ember.computed("model.channel", {
              get: function () {
                  return this.get("model.channel.channelPartnerSystemId") === "mybillsagent";
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isAdmin: Ember.computed("model.channel", {
              get: function () {
                  return this.get("model.channel.isPayreqAdmin");
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isAdminAndNotSub: Ember.computed("model.channel", {
              get: function () {
                  return this.get("model.channel.isPayreqAdmin") &&
                      !this.get("model.channel.isSub");
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isNotAdminAndNotSub: Ember.computed("model.channel", {
              get: function () {
                  return !this.get("model.channel.isPayreqAdmin") &&
                      !this.get("model.channel.isSub");
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isCustomEmailTemplate: Ember.computed("model.channel.emailTemplateType", {
              get: function () {
                  return this.get("model.channel.emailTemplateType") == 2;
              },
              set: function (key, newValue) {
                  return newValue;
              }
          }),

          isTemplateNotProvidedByMailhouse: Ember.computed("model.channel.emailTemplateType", {
              get: function () {
                  return this.get("model.channel.emailTemplateType") != 3;
              }
          }),


      });

      Ember.TEMPLATES['components/settings-biller-manual'] = Ember.Handlebars.compile(billerSettingsManualTemplate);
      App.SettingsBillerManualComponent = Ember.Component.extend({
        billerSettings: null,

        actions: {
          generateIncomingBillsEmailAddress: function (model) {
            this.sendAction('generateIncomingBillsEmailAddress', model);
          }
        }
      });

      Ember.TEMPLATES['components/settings-biller-saasu'] = Ember.Handlebars.compile(billerSettingsSaasuTemplate);
      App.SettingsBillerSaasuComponent = Ember.Component.extend({
        billerSettings: null
      });

      Ember.TEMPLATES['components/settings-biller-qbo-payroll'] = Ember.Handlebars.compile(billerSettingsQboPayrollTemplate);
      App.SettingsBillerQboPayrollComponent = Ember.Component.extend({
        billerSettings: null,
        biller: null,
        connectWindow: null,

        requestUrl: function(billerId) {
          return App.payreqConfig.qboPayroll.authRequestUrl.fmt(billerId);
        },

        hasAuthorised: Ember.computed("billerSettings.hasUpdateAccess", function () {
          return this.get("billerSettings.qboPayrollAuthorisation");
        }),

        actions: {
          connectToQbo: function (model) {
            document.location = this.requestUrl(this.get("biller.id"));
          },
          disconnectFromQbo: function () {
            this.sendAction('disconnectQboAccount', this.get("billerSettings.qboPayrollAuthorisation"));
          },
          reconnectToQbo: function () {
            document.location = this.requestUrl(this.get("biller.id"))+"?manualReconnect=true";
          }
        }

      });

      Ember.TEMPLATES['components/settings-biller-filetx'] = Ember.Handlebars.compile("");
      App.SettingsBillerFiletxComponent = Ember.Component.extend({
        billerSettings: null
      });

    });
