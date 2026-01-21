define(['i18n!nls/contacts',
        'i18n!nls/globals',
      'text!templates/contacts.html',
      'text!templates/contact.html',
      'text!templates/contacts-import-modal.html',
      'application', 'emberdata', 'billers', 'tabular-data-helper', 'modal-dialog', 'form-helper'],
    function (translations, globalStrings, contactsTemplate, contactTemplate, contactsImportModal) {

      var attr = DS.attr;
      var contactsPageSize = App.payreqConfig.contacts.pageSize;

      App.Contact = DS.Model.extend({
        billerAccountNumber: attr(),
        status: attr(),
        importTime: attr("date"),
        lastUpdated: attr("date"),
        authItem1: attr(),
        authItem2: attr(),
        authItem3: attr(),
        authItem4: attr(),
        name: attr(),
        billerActorId: attr("number"),
        firstName: attr(),
        lastName: attr(),
        middleName: attr(),
        address1: attr(),
        address2: attr(),
        municipality: attr(),
        province: attr(),
        postalCode: attr(),
        country: attr(),
        flaggedReason: attr(),
        contactId1: attr(),
        contactId2: attr(),
        contactId3: attr(),
        contactId4: attr(),
        contactId5: attr(),
        contactId6: attr(),
        contactId7: attr(),
        contactId8: attr(),
        businessIdentifier: attr(),
        updatedBy: attr(),
        meta: attr()
      });

      App.ContactsStringsMixin = Ember.Mixin.create({
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

      App.BillerContactsRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
        model: function (params) {
          var searchParms = {billerId: this.modelFor("biller").get("id"),
                            sortOrder: "last_updated",
                            exactSearch: false,
                            exactSearchNoticeGroup: false};

          if (this.useOldFilters(searchParms.billerId)) {
            searchParms = $.extend({}, this.controller.allSearchFilters(), searchParms);
          }

          return this.execReload(searchParms);
        },

        useOldFilters: function (billerId) {
          return this.controller &&
              this.controller.get("selectedFilters") &&
              (billerId == this.controller.get("selectedFilters.billerId"));
        },

        setupController: function (controller, model) {
          controller.set("meta", model.get("meta"));

          this._super(controller, model);

          var baseFilters = {billerId: this.modelFor("biller").get("id"),
                            sortOrder: "last_updated",
                            exactSearch: false,
                            exactSearchNoticeGroup: false};

          if (this.useOldFilters(this.modelFor("biller").get("id"))) {
            baseFilters = $.extend({}, this.controller.allSearchFilters(), baseFilters);
          }

          //set the exact search checkboxes based on the previously set value
          controller.set("exactSearchNoticeGroup", baseFilters.exactSearchNoticeGroup);
          controller.set("exactSearch", baseFilters.exactSearch);

          controller.setBaseFilters(baseFilters);
          controller.set("biller", this.modelFor("biller"));
        },

        execReload: function (selectedFilters) {
          return this.store.query("contact", selectedFilters);
        },

        getAuthFields: function () {
          return Ember.$.get("/data/contacts/%@/getAuthFields".fmt(this.modelFor("biller").get("id")));
        },

        actions: {
          reloadData: function (selectedFilters) {
            this.doRemoteAction(function () {
                  return this.execReload(selectedFilters);
                },
                function (results) {
                  this.controller.set("model", results);
                  this.controller.set("meta", results.get("meta"));
                },
                "An error occurred while retrieving the list of contacts. Please try again later.");
          },

          downloadData: function (url) {
            this.doRemoteAction(function () {
                  return Ember.$.get(url.fmt(this.modelFor("biller").get("id")));
                },
                function (results) {
                  if (results && results.action && results.action == "download") {
                      window.location.assign(this.controller.get("downloadUrl") + "downloadFileId" + results.downloadFileId);
                  } else if (results && results.action && results.action == "job") {
                    this.showSuccessMessage("A job with id " + results.jobId + " successfully created for this download. Please go to the job page to get the file.");
                  }
                },
                "An error occurred while downloading contacts. Please try again later.");
          },

          saveContact: function (contact) {
            var self = this;
            this.doRemoteAction(function () {
                  return contact.save();
                },
                function (results) {
                  this.showSuccessMessage(translations.all.createSuccessMessage);
                  //TODO: have to fix it properly.
                  var selectedFilters = this.controller.get("selectedFilters");
                  if(!selectedFilters.get("searchTerm")){
                    Ember.set(selectedFilters, "searchTerm", null);
                  }
                  this.send("reloadData", selectedFilters);
                  this.controller.doClearCreate();
                },
                function (result) {

                  if (result.errors) {


                    var errorStatus = 0;
                    if (result.errors && result.errors.length > 0) {
                        errorStatus = result.errors[0].status;
                    }

                    var error =  "Unable to create contact please contact Payreq Support.";
                    switch(errorStatus) {
                        case 422:
                            error = self.controller.get("strings.validation.invalidBillerAccountNumberDuplicate");
                            break;
                        case 423:
                            error = self.controller.get("strings.validation.invalidBillerAccountNumberLength");
                            break;
                        default:

                      }

                    this.showErrorMessage(self.controller.get("strings.validation.contactErrorMsg").fmt(error));

                    this.controller.handleErrors({field: "billerAccountNumber", message: error});
                  } else {
                    this.showErrorMessage(self.controller.get("strings.validation.contactError"));
                  }
                });
          },

          deleteContact: function (contact) {
            this.doRemoteAction(function () {
                  return contact.destroyRecord();
                },
                function (results) {
                  this.showSuccessMessage(translations.all.deleteSuccessMessage);
                  //TODO: have to fix it properly.
                  var selectedFilters = this.controller.get("selectedFilters");
                  if(!selectedFilters.get("searchTerm")){
                    Ember.set(selectedFilters, "searchTerm", null);
                  }
                  this.send("reloadData", selectedFilters);
                },
                "An error occurred while deleting the selected contact. Please try again later.");
          },

          prepareImportModal: function (onComplete) {
            this.doRemoteAction(function () {
                  return this.getAuthFields();
                },
                function (results) {
                  this.controller.set("authFieldNames", results.authFieldNames);
                  onComplete();
                },
                "An error occurred while getting the auth field names. Please try again later");
          },

          persistImportedContacts: function (replaceAll, fileDataId) {
            this.doRemoteAction(function () {
                  return Ember.$.post("/data/contacts/%@/import".fmt(this.modelFor("biller").get("id")),
                      {replaceAll: replaceAll, fileDataId: fileDataId});
                },
                function (results) {
                  if (results.success) {
                    this.showSuccessMessage("Job to import contacts started successfully");
                  } else {
                    this.showErrorMessage("An error occurred while importing contacts.");
                  }
                  this.send("reloadData", this.controller.allSearchFilters());
                },
                "An error occurred while importing contacts. Please try again later.");
          },

          clearFileDataInSession: function (fileDataId) {
            this.doRemoteAction(function () {
              return Ember.$.post("/data/contacts/cancelImport", {fileDataId: fileDataId});
            });
          },

        showAndHide: function(){
            var collapseElement = $("#collapse1");
            if(collapseElement.hasClass("in")){
                this.controller.set("collapse", false);
            } else {
                this.controller.set("collapse", true);
            }
        },

        }
      });

      App.ContactEditingMixin = Ember.Mixin.create({
        canCreateContact: Ember.computed("application.entityContext", "biller", "biller.systemId", {
          get: function () {
            return this._canPerformAction("create") && this.get("biller.systemId")!="qbo-payroll";
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        canDeleteContact: Ember.computed("application.entityContext", "biller", "biller.systemId", {
          get: function () {
            return this._canPerformAction("delete") && this.get("biller.systemId")!="qbo-payroll";
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        canUpdateContact: Ember.computed("application.entityContext", {
          get: function () {
            return this._canPerformAction("update");
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        hasMultipleChannels: Ember.computed("model", {
            get: function () {
                return this.getMeta().isMultiChannelBiller;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        _canPerformAction: function (action) {
          if (this.get("application.entityContext")) {
            var permissions = this.get("application.permissions");
            return permissions.includes("contacts.edit." + action);
          } else {
            return false;
          }
        },

        handleErrors: function (response) {
          this.errorOnField("#" + response.field, response.message);
        },

        _validateContact: function (contactToValidate) {
          this.removeErrors("#create-contact-form");

          var errors = false;

          if (String.isBlank(contactToValidate.get("billerAccountNumber"))) {
            this.errorOnField("#billerAccountNumber", this.get("strings.validation.billerAccountNumberMissing"));
            errors = true;
          }

          if (String.isBlank(contactToValidate.get("name"))) {
            this.errorOnField("#customerName", this.get("strings.validation.nameMissing"));
            errors = true;
          }

          for (var i = 1; i < 9; i++) {
            if(String.isBlank(contactToValidate.get("contactId" + i)) &&
                this.get("showContactId" + i) &&
                !String.isBlank(this.get("contactField" + i + "Name"))){
                this.errorOnField("#contactId" + i, this.get("strings.validation.authFieldMissing").fmt(this.get("contactField" + i + "Name")));
                errors = true;
            }
          }

          return !errors;
        },

        _authFieldNames: function (model) {
          return this.getMeta().authFieldNames;
        },

        _contactFieldNames: function (model) {
            return this.getMeta().contactFieldNames;
        },

        _channelIdFields: function (model) {
            return this.getMeta().channelIdFields;
        },

        _authFields: function () {
            return this.getMeta().authFields;
        },

        contactField1IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-1");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField2IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-2");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField3IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-3");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField4IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-4");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField5IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-5");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField6IsChannelId: Ember.computed("model", {
            get: function () {
                return this._channelIdFields(this.get("model")).contains("contact-id-6");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField7IsChannelId: Ember.computed("model", {
          get: function () {
              return this._channelIdFields(this.get("model")).contains("contact-id-7");
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        contactField8IsChannelId: Ember.computed("model", {
          get: function () {
              return this._channelIdFields(this.get("model")).contains("contact-id-8");
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        contactField1IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-1");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField2IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-2");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField3IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-3");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField4IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-4");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField5IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-5");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField6IsAuth: Ember.computed("model", {
            get: function () {
                return this._authFields(this.get("model")).contains("contact-id-6");
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField7IsAuth: Ember.computed("model", {
          get: function () {
              return this._authFields(this.get("model")).contains("contact-id-7");
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        contactField8IsAuth: Ember.computed("model", {
          get: function () {
              return this._authFields(this.get("model")).contains("contact-id-8");
          },
          set: function (key, newValue) {
              return newValue;
          }
        }),

        contactField1Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId1Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField2Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId2Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField3Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId3Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField4Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId4Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField5Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId5Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        contactField6Name: Ember.computed("model", {
            get: function () {
                return this._contactFieldNames(this.get("model")).contactId6Field;
            },
            set: function (key, newValue) {
                return newValue;
            }
        }),

        deleteConfirmActionButtons: [App.ModelDialogActionButton.create({label: "Cancel", actionName: "cancel", bsType: "btn-link"}),
          App.ModelDialogActionButton.create({label: translations.all.deleteContact, bsType: "btn-danger", actionName: "confirm"})],


        actions: {
          promptDeleteContact: function (contact) {
            this.set("deletingContact", contact);
            this.showModal("contacts-confirm-delete");
          },

          confirmDeleteContact: function () {
            this.send("deleteContact", this.get("deletingContact"));
          }
        }
      });

      Ember.TEMPLATES['contacts-import-modal'] = Ember.Handlebars.compile(contactsImportModal);
      App.ContactsImportMixin = Ember.Mixin.create({
        application: Ember.inject.controller(),
        uploadedInfo: null,
        replaceAll: false,
        showLoading: false,
        importActionButtons: [App.ModelDialogActionButton.create({label: "Cancel", actionName: "cancel", bsType: "btn-link"}),
          App.ModelDialogActionButton.create({
            label: "Import Contacts", primary: true,
            bsType: "btn-primary", actionName: "confirm"
          })],

        contactsUploadUrl: Ember.computed("replaceAll", "biller.id", {
          get: function () {
            var url = ("/data/contacts/%@/import-file").fmt(this.get("biller").get("id"));
            return url;
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        clear: function () {
          this.set('replaceAll', false);
          this.set('uploadedInfo', null);
          this.set('showLoading', false);
        },

        canImportContacts: Ember.computed("biller", "biller.systemId", {
          get: function () {
            var permissions = this.get("application.permissions");
            return permissions.includes("contacts.import") && this.get("biller.systemId")!="qbo-payroll";
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        isPrimaryDisabled: Ember.computed('uploadedInfo', 'uploadError', 'validationError', {
          get: function () {
            return (this.get('uploadedInfo') == null || this.get('uploadError') != null || this.get('validationError') != null);
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        confirmationRequired: Ember.computed("uploadedInfo.result", "validationError", {
          get: function () {
            if (!this.get("validationError")) {
              return this.get("uploadedInfo.result.confirmationRequired");
            }
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        uploadError: Ember.computed('uploadedInfo', 'confirmationRequired', 'strings', {
          get: function () {
            if (typeof this.get('uploadedInfo.error') === 'string') {
              return this.get('uploadedInfo.error');
            } else if (this.get('uploadedInfo.error.affectedJob')) {
              return this.get("strings.contactsImportModal.error.fileAlreadyUploadedRunning");
            }
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        onUploadedInfo: function () {
          this.set('showLoading', false);
        }.observes("uploadedInfo"),

        uploadHasErrors: Ember.computed("validationError", "uploadError", {
          get: function () {
            if (this.get("validationError") || this.get("uploadError")) {
              return true;
            } else return false;
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        validationError: Ember.computed("uploadedInfo.result", "replaceAll", {
          get: function () {
            if (this.get("replaceAll")) {
              return this.get("uploadedInfo.result.replace.errors");
            } else {
              return this.get("uploadedInfo.result.add.errors");
            }
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        affectedJob: Ember.computed("uploadedInfo", "validationError", {
          get: function () {
            if (!this.get("validationError")) {
              if (typeof this.get("uploadedInfo.error") === "object") {
                return Ember.Object.create(this.get("uploadedInfo.error")).get("affectedJob");
              } else if (this.get("uploadedInfo.result")) {
                return Ember.Object.create(this.get("uploadedInfo.result")).get("affectedJob");
              }
            } else return null;
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        confirmationMessage: Ember.computed('uploadedInfo', 'replaceAll', {
          get: function () {
            if (this.get('uploadedInfo') && this.get('uploadedInfo.result')) {
              var result = this.get('uploadedInfo.result');

              var counts;
              var errors;
              if (this.get("replaceAll")) {
                counts = result.replace.counts;
                errors = result.replace.errors;
              } else {
                counts = result.add.counts;
                errors = result.add.errors;
              }

              if (!errors) {
                var importSummary = "";

                if (counts.addcount || counts.addcount == 0) {
                  importSummary = "Add Counts : " + counts.addcount + "<br>";
                }
                if (counts.updatecount || counts.updatecount == 0) {
                  importSummary = importSummary + "Update Counts: " + counts.updatecount + "<br>";
                }
                if (counts.deletecount || counts.deletecount == 0) {
                  importSummary = importSummary + "Delete Counts: " + counts.deletecount;

                  if (counts.registereddeletecount || counts.registereddeletecount == 0) {
                    importSummary = importSummary + " (Registered Payers: " + counts.registereddeletecount + ")";
                  }
                }
                return this.get("strings.contactsImportModal.importConfirmation").fmt(importSummary);
              }
            }
            return null;
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),


        importInstructions: Ember.computed("biller.id", {
          get: function () {

            var isMultiChannel = this.get("hasMultipleChannels");

            //contact id field key and value map
            var contactFieldMap = this._contactFieldNames(this.get("model"));
            var contactMapKeys = Object.keys(contactFieldMap);
            contactMapKeys.sort();

            //contact field names
            var contactFieldNames = "";

            for (var i = 0; i < contactMapKeys.length; i++) {
                if(!isMultiChannel && i == 0) {
                    continue;
                } else {
                    contactFieldNames = contactFieldNames + ",\"" + contactFieldMap[contactMapKeys[i]] + "\"";
                }
            }


            authFieldNames = "<strong>" + contactFieldNames + "</strong>";

            var sampleData = "<br>";
            for (var i = 1; i < 4; i++) {
              sampleData = sampleData + "\"0000" + i + "\",\"" + "Name " + i + "\"";


              for (var j = 0; j < contactMapKeys.length; j++) {
                  if(!isMultiChannel && j == 0) {
                      continue;
                  } else {
                      sampleData = sampleData + ",\"" + contactFieldMap[contactMapKeys[j]] + " " + i + "\"";
                  }
              }

              sampleData = sampleData + "<br>";
            }
            sampleData = sampleData + "<strong>\"TRAILER\",3</strong>";

            if(isMultiChannel){
              return this.get("strings.contactsImportModal.instructionsMultiChannel").fmt(authFieldNames, sampleData);
            }

            return this.get("strings.contactsImportModal.instructions").fmt(authFieldNames, sampleData);
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        isCancelDisabled: Ember.computed("uploadedInfo", {
          get: function () {
            return true;
          },
          set: function (key, newValue) {
            return newValue;
          }
        }),

        actions: {
          importContacts: function () {
            this.send("prepareImportModal", $.proxy(function () {
              this.clear();
              this.showModal("contacts-import-modal")
            }, this));
          },
            doCancel: function () {
                if (this.get('uploadedInfo') && this.get('uploadedInfo').fileDataId) {
                    this.send("clearFileDataInSession", this.get('uploadedInfo').fileDataId);
                }
                this.hideModal();
            },
          doImportContacts: function () {
            this.send("persistImportedContacts", this.get('replaceAll'), this.get('uploadedInfo.fileDataId'));
          },

          doClose: function () {
            this.hideModal();
          },

          setUploading: function () {
            this.set('showLoading', true);
          },
        }
      });

      App.ContactsDisplayFieldMixin = Ember.Mixin.create({
        displayFields: Ember.computed("biller", {
          get: function() {
            var biller = this.get("biller");
            if(biller.get("displayFields")){
              return billsDisplayFields = biller.get("displayFields").filter(function(displayField){
                return displayField.displayEntityName=="contact";
              });
            }
            return [];
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),

        _showField:function(fieldName){
          var fields = this.get("displayFields").filter(function(displayField){
            return displayField.name==fieldName;
          });
          if(fields && fields.length>0){
            return true;
          }
          return false;
        },
        showBillerAccountNumber: Ember.computed("biller", {
          get: function() {
            return this._showField("billerAccountNumber");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),

        showLastUpdated: Ember.computed("biller", {
          get: function() {
            return this._showField("lastUpdated");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showName: Ember.computed("biller", {
          get: function() {
            return this._showField("name");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAuthItem1: Ember.computed("biller", {
          get: function() {
            return this._showField("authItem1");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAuthItem2: Ember.computed("biller", {
          get: function() {
            return this._showField("authItem2");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAuthItem3: Ember.computed("biller", {
          get: function() {
            return this._showField("authItem3");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAuthItem4: Ember.computed("biller", {
          get: function() {
            return this._showField("authItem4");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showContactId1: Ember.computed("biller", {
            get: function() {
                if(this.get("hasMultipleChannels")) {
                    return this._showField("contactId1");
                }
                return false;
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId2: Ember.computed("biller", {
            get: function() {
                return this._showField("contactId2");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId3: Ember.computed("biller", {
            get: function() {
                return this._showField("contactId3");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId4: Ember.computed("biller", {
            get: function() {
                return this._showField("contactId4");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId5: Ember.computed("biller", {
            get: function() {
                return this._showField("contactId5");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId6: Ember.computed("biller", {
            get: function() {
                return this._showField("contactId6");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showContactId7: Ember.computed("biller", {
          get: function() {
              return this._showField("contactId7");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),
        showContactId8: Ember.computed("biller", {
          get: function() {
              return this._showField("contactId8");
          },
          set: function(key, newValue) {
              return newValue;
          }
        }),
        showFirstName: Ember.computed("biller", {
          get: function() {
            return this._showField("firstName");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showMiddleName: Ember.computed("biller", {
          get: function() {
            return this._showField("middleName");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showLastName: Ember.computed("biller", {
          get: function() {
            return this._showField("lastName");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showFullName: Ember.computed("showFirstName", "showMiddleName", "showLastName", {
          get: function() {
            return this.get("showFirstName") || this.get("showMiddleName") || this.get("showLastName");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAddress1: Ember.computed("biller", {
          get: function() {
            return this._showField("address1");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showAddress2: Ember.computed("biller", {
          get: function() {
            return this._showField("address2");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showMunicipality: Ember.computed("biller", {
          get: function() {
            return this._showField("municipality");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showProvince: Ember.computed("biller", {
          get: function() {
            return this._showField("province");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showPostalCode: Ember.computed("biller", {
          get: function() {
            return this._showField("postalCode");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showCountry: Ember.computed("biller", {
            get: function() {
                return this._showField("country");
            },
            set: function(key, newValue) {
                return newValue;
            }
        }),
        showAddress: Ember.computed("showAddress1", "showAddress2", "showMunicipality", "showPostalCode", {
          get: function() {
            return this.get("showAddress1") || this.get("showAddress2") || this.get("showMunicipality") || this.get("showPostalCode");
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
        showActions: Ember.computed("biller", "biller.systemId", {
          get: function() {
            return this.get("biller.systemId")!="qbo-payroll";
          },
          set: function(key, newValue) {
            return newValue;
          }
        }),
      });

      Ember.TEMPLATES['biller/contacts'] = Ember.Handlebars.compile(contactsTemplate);
      App.BillerContactsController = Ember.Controller.extend(App.TabularDataController,
          App.ContactsStringsMixin,
          App.ContactEditingMixin,
          App.ModalProducingControllerMixin,
          App.FormHelperMixin,
          App.ContactsImportMixin,
          App.ContactsDisplayFieldMixin, {
            application: Ember.inject.controller(),
            pageSize: contactsPageSize,
            prepareDownloadUrl: "/data/contacts/%@/download?",
            downloadUrl: "/download/contacts/download?",
            modelName: "contact",
            newContact: Em.Object.create({}),
            globalStrings: globalStrings,

            isConnected: Ember.computed("model.meta.isConnected", {
              get: function(){
                return this.get("model.meta.isConnected");
              },

              set: function(key, newValue) {
                return newValue;
              }
            }),

            _baseColumns: Ember.computed("biller",{
              get: function(){
                var _baseColumns = [];
                _baseColumns.push(App.TableColumn.create({
                    fieldName: "billerAccountNumber", sortable: this.get("isNotQBOPayrollBiller"),
                    visible: this.get("showBillerAccountNumber")
                }));
                _baseColumns.push(App.TableColumn.create({fieldName: "name", sortable: false, visible:this.get("showName")}));
                return _baseColumns;
              },

              set: function(key, newValue) {
                return newValue;
              }
            }),

            _tailColumns: Ember.computed("biller",{
              get: function(){
                var _tailColumns = [];
                _tailColumns.push(App.TableColumn.create({fieldName: "lastUpdated", sortable: true, visible:this.get("showLastUpdated")}));
                _tailColumns.push(App.TableColumn.create({type: "actions", visible:this.get("showActions")}));
                return _tailColumns;
              },

              set: function(key, newValue) {
                return newValue;
              }
            }),



            _contactItemColumns: Ember.computed("biller",{
                get: function(){
                    var _contactItemColumns = [];
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId1",sortable: false,
                        contactFieldName: "contactId1Field",isAuthField:this.get("contactField1IsAuth"), visible:this.get("showContactId1"),
                        isContactField: true, isChannelId:this.get("contactField1IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId2",sortable: false,
                        contactFieldName: "contactId2Field",isAuthField:this.get("contactField2IsAuth"), visible:this.get("showContactId2"),
                        isContactField: true, isChannelId:this.get("contactField2IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId3",sortable: false,
                        contactFieldName: "contactId3Field",isAuthField:this.get("contactField3IsAuth"), visible:this.get("showContactId3"),
                        isContactField: true, isChannelId:this.get("contactField3IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId4",sortable: false,
                        contactFieldName: "contactId4Field",isAuthField:this.get("contactField4IsAuth"), visible:this.get("showContactId4"),
                        isContactField: true, isChannelId:this.get("contactField4IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId5",sortable: false,
                        contactFieldName: "contactId5Field",isAuthField:this.get("contactField5IsAuth"), visible:this.get("showContactId5"),
                        isContactField: true, isChannelId:this.get("contactField5IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId6",sortable: false,
                        contactFieldName: "contactId6Field",isAuthField:this.get("contactField6IsAuth"), visible:this.get("showContactId6"),
                        isContactField: true, isChannelId:this.get("contactField6IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId7",sortable: false,
                        contactFieldName: "contactId7Field",isAuthField:this.get("contactField7IsAuth"), visible:this.get("showContactId7"),
                        isContactField: true, isChannelId:this.get("contactField7IsChannelId")}));
                    _contactItemColumns.push(App.TableColumn.create({fieldName: "contactId8",sortable: false,
                        contactFieldName: "contactId8Field",isAuthField:this.get("contactField8IsAuth"), visible:this.get("showContactId8"),
                        isContactField: true, isChannelId:this.get("contactField8IsChannelId")}));
                    return _contactItemColumns;
                },

                set: function(key, newValue) {
                    return newValue;
                }
            }),

            columns: Ember.computed("model", "strings", {
              get: function () {

                var contactFieldNames = this._contactFieldNames(this.get("model"));

                var contactFields = this.get("_contactItemColumns").filter(function (column) {
                  return !Ember.isNone(contactFieldNames[column.get("contactFieldName")]);
                });

                contactFields.forEach(function (column) {
                  if(column.get("isAuthField") && column.get("isChannelId")) {
                      column.set("title", contactFieldNames[column.get("contactFieldName")] + " (Id/Auth)");
                  } else if (column.get("isChannelId")) {
                      column.set("title", contactFieldNames[column.get("contactFieldName")] + " (ID)");
                  } else if (column.get("isAuthField")) {
                      column.set("title", contactFieldNames[column.get("contactFieldName")] + " (Auth)");
                  } else {
                      column.set("title", contactFieldNames[column.get("contactFieldName")]);
                  }
                });

                var columns = this.get("_baseColumns")
                .concat(contactFields || [])
                .concat(this.get("_tailColumns"));

                var controller = this;
                columns.forEach((function (col) {
                  if(!col.get("isContactField")){
                    col.set("title", controller.get("strings.capitalised." + (col.get("fieldName") || col.get("type"))));
                  }
                  if(controller.get("hasMultipleChannels") && col.get("fieldName") === "billerAccountNumber") {
                    col.set("title", controller.get("strings.capitalised.contactAccountId"));
                  }
                }));

                return columns;
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            downloadColumns: Ember.computed("model", "strings", {

              get: function () {
                return this.get("columns");
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            getMeta: function () {
              return this.get("meta");
            },

            epostSendContacts: Ember.computed("model", {
              get: function () {
                  return this.get("meta").nextSendContactsToEpost;
              },
              set: function (key, newValue) {
                  return newValue;
              }
            }),

            billerAccountNumberLength: Ember.computed("model", {
              get: function () {
                return this.get("meta").billerAccountNumberLength;
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            defaultDateRange: Ember.computed("model", {
              get: function () {
                return this.get("meta").defaultDateRange;
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            doClearCreate: function () {
              this.set("newContact", Ember.Object.create());
            },

            hasActionButtons: Ember.computed("canImportContacts", {
              get: function () {
                return this.get("canImportContacts");
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            recordCount: Ember.computed("model", {
              get: function () {
                return this.get("meta").total;
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            hasMultipleChannels: Ember.computed("model", {
                get: function () {
                    return this.get("meta").isMultiChannelBiller;
                },
                set: function (key, newValue) {
                    return newValue;
                }
            }),

            hasContacts: Ember.computed("model", {
              get: function () {
                return (this.get("meta").total > 0);
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            isQBOPayrollBiller: Ember.computed("biller", "biller.systemId", {
              get: function () {
                return this.get("biller.systemId")=="qbo-payroll";
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            isNotQBOPayrollBiller: Ember.computed("isQBOPayrollBiller", {
              get: function () {
                return !this.get("isQBOPayrollBiller");
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            showSearch: Ember.computed("model", {
              get: function () {
                  var search = this.get("collapse");
                  if (typeof search == 'undefined') {
                      return false;
                  }
                  return search;
              },
              set: function (key, newValue) {
                  return newValue;
              }
            }),

            exactSearchMessage: Ember.computed("model", {
               get: function(){
                   const field = this.get("hasMultipleChannels") === true ? this.get("strings.contactAccountIdLabel") : this.get("strings.billerAccountNumberLabel");
                   return this.get("strings.exactSearch").fmt(field);
               },
            }),

            exactSearchNoticeGroupMessage: Ember.computed("model", {
              get: function(){
                  return this.get("strings.exactSearch").fmt(this.get("contactField3Name"))
              },
            }),

            actions: {
              clearCreate: function () {
                this.doClearCreate();c
                this.removeErrors("#create-contact-form");
              },

              changedSelection: function () {
                this.set("selectedFilters.exactSearch", !this.get("selectedFilters.exactSearch"));
                if (this.get("selectedFilters.exactSearchNoticeGroup") === true){
                    this.set("selectedFilters.exactSearchNoticeGroup", !this.get("selectedFilters.exactSearchNoticeGroup"));
                    $("#exactmatchNoticeGroup").prop('checked', false);
                }
                this.send("reloadData", this.get("selectedFilters"));
              },

              changedSelectionNoticeGroup: function () {
                this.set("selectedFilters.exactSearchNoticeGroup", !this.get("selectedFilters.exactSearchNoticeGroup"));
                if (this.get("selectedFilters.exactSearch") === true){
                    this.set("selectedFilters.exactSearch", !this.get("selectedFilters.exactSearch"));
                    $("#exactmatch").prop('checked', false);
                }
                this.send("reloadData", this.get("selectedFilters"));
              },

              validateContact: function () {
                if (this._validateContact(this.get("newContact"))) {
                  var newContact = this.get("store").createRecord('contact', {});
                  newContact.set("billerActorId", this.get("selectedFilters").billerId);
                  newContact.set("billerAccountNumber", this.get("newContact.billerAccountNumber"));
                  newContact.set("name", this.get("newContact.name"));

                  if(this.get("hasMultipleChannels")){
                    if(this.get("newContact.contactId1")){
                      newContact.set("contactId1", this.get("newContact.contactId1"));
                    }
                  } else {
                    //ensure backwards compatibility for multi channel design
                    newContact.set("contactId1", this.get("newContact.billerAccountNumber"));
                  }
                  if(this.get("newContact.contactId2")){
                      newContact.set("contactId2", this.get("newContact.contactId2"));
                  }
                  if(this.get("newContact.contactId3")){
                      newContact.set("contactId3", this.get("newContact.contactId3"));
                  }
                  if(this.get("newContact.contactId4")){
                      newContact.set("contactId4", this.get("newContact.contactId4"));
                  }
                  if(this.get("newContact.contactId5")){
                      newContact.set("contactId5", this.get("newContact.contactId5"));
                  }
                  if(this.get("newContact.contactId6")){
                      newContact.set("contactId6", this.get("newContact.contactId6"));
                  }
                  if(this.get("newContact.contactId7")){
                      newContact.set("contactId7", this.get("newContact.contactId7"));
                  }
                  if(this.get("newContact.contactId8")){
                      newContact.set("contactId8", this.get("newContact.contactId8"));
                  }
                  if(this.get("newContact.businessIdentifier")){
                      newContact.set("businessIdentifier", this.get("newContact.businessIdentifier"));
                  }

                  this.send("saveContact", newContact);
                }
              }
            },
          });

      Ember.TEMPLATES['contacts-confirm-delete'] = Ember.Handlebars.compile("{{#modal-dialog modalTitle=\"" + translations.all.deleteContact + "\" actionButtons=deleteConfirmActionButtons " +
          "onClose=\"closeModal\" confirm=\"confirmDeleteContact\"}}" +
          translations.all.deleteContactConfirmation + " <strong>{{deletingContact.billerAccountNumber}}</strong>?" +
          "{{/modal-dialog}}");


      App.BillerContactRoute = App.BaseBillerRoute.extend(App.RouteWithRemoteActionsMixin, {
        model: function (params) {
          return this._getContact(params.contactId);
        },

        setupController: function (controller, model) {
          this._super(controller, model);

          controller.set("biller", this.modelFor("biller"));
        },

        _getContact: function (id) {
          return this.store.findRecord("contact", id, {reload: true});
        },

        actions: {
          saveContact: function (contact) {
            this.doRemoteAction(function () {
                  return contact.save();
                },
                function (results) {
                  this.transitionTo("biller.contact", results.get("id"));
                  this.showSuccessMessage(translations.all.updateSuccessMessage);
                },
                function (results) {
                  this.showErrorMessage("An error occured while updating the selected contact. Please try again later.");
                  contact.rollbackAttributes();

                });
          },

          refresh: function (contact) {
            contact.rollbackAttributes();
            this.store.unloadRecord(contact);
            this.doRemoteAction(function () {
                  return this._getContact(contact.id);
                },
                function (results) {
                  this.controller.set("model", results);
                  this.controller.set("biller", this.modelFor("biller"));
                },
                "An error occured while refreshing the contact. Please try again later.");
          },

          refreshAndGoBack: function (contact) {
              contact.rollbackAttributes();
              this.store.unloadRecord(contact);
              this.doRemoteAction(function () {
                      return this._getContact(contact.id);
                  },
                  function (results) {
                      this.controller.set("model", results);
                      this.controller.set("biller", this.modelFor("biller"));
                  },
                  "An error occured while going back to contacts. Please try again later.");
              this.transitionTo("biller.contacts");
          },

          deleteContact: function (contact) {
            this.doRemoteAction(function () {
                  return contact.destroyRecord();
                },
                function (results) {
                  this.transitionTo("biller.contacts").then($.proxy(function () {
                    this.showSuccessMessage(translations.all.deleteSuccessMessage);
                  }, this));
                },
                function (results) {
                  this.showErrorMessage("An error occured while deleting the selected contact. Please try again later.");
                  contact.rollbackAttributes();
                });
          }
        }
      });

      Ember.TEMPLATES['biller/contact'] = Ember.Handlebars.compile(contactTemplate);
      App.BillerContactController = Ember.Controller.extend(App.ContactsStringsMixin,
          App.ContactEditingMixin,
          App.ModalProducingControllerMixin,
          App.FormHelperMixin,
          App.ContactsDisplayFieldMixin, {
            application: Ember.inject.controller(),
            billerContacts: Ember.inject.controller(),

            updatedByUserDisplay: Ember.computed("model.updatedBy", {
              get: function () {
                return (this.get("model.updatedBy") == this.get("application.userContext.username")) ?
                    "you" :
                    this.get("model.updatedBy");
              },
              set: function (key, newValue) {
                return newValue;
              }
            }),

            getMeta: function () {
              if (this.get("billerContacts") && this.get("billerContacts").getMeta()) {
                return this.get("billerContacts").getMeta();
              }
              return this.get("model.meta");
            },

            actions: {
              validateContact: function () {
                if (this._validateContact(this.get("model"))) {
                  this.send("saveContact", this.get("model"));
                } else {
                    this.get("model").rollbackAttributes();
                }
              },

              cancelUpdate: function () {
                this.get("model").rollbackAttributes();
              }
            }
          });

    });
