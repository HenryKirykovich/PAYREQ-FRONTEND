define(['i18n!nls/settings',
        'text!templates/settings-bill-templates.html',
        'text!templates/bill-template-upload-modal.html',
        'application', 'settings', 'billers', 'modal-dialog', 'form-helper'],
  function(settingsStrings, settingsBillTemplatesTemplate, billTemplateUploadModal) {

    var attr = DS.attr;

    App.BillTemplate = DS.Model.extend({
      id: attr(),
      name: attr(),
      fileName: attr(),
      documentId: attr(),
      createdBy: attr(),
      createdOn: attr("date")
    });

    App.BillerSettingsBillTemplatesRoute = App.SettingsSubRouteBase.extend({
      model: function() {
        return App.loadBillerSettings(this.modelFor("biller").id, this.store.query("billTemplate", {billerId: this.modelFor("biller").id}));
      },

      setupController: function(controller, model) {
        this._super(controller, model);
        controller.set("biller", this.modelFor("biller"));
      },

      actions: {
        createBillTemplate: function(uploadedInfo, templateName) {
          var self = this;
          this.doRemoteAction(function() {
            return Ember.$.post("/data/billTemplates/create",
                          {billerId: this.modelFor("biller").get("id"),
                           name: templateName,
                           fileName: uploadedInfo.fileName,
                           documentId: uploadedInfo.documentId});
          },
          function(results) {
            if (results.success) {
                self.refresh();
                this.showSuccessMessage(settingsStrings.all.successfulTemplateUpload);
            } else {
                this.showErrorMessage(results.message ? settingsStrings.all.templateErrors[results.message] : settingsStrings.all.genericTemplateError)
            }
          },
          settingsStrings.all.genericTemplateFail);
        },

        downloadBillTemplate: function(billerId, id){
            this.doRemoteAction(function () {
                    return Ember.$.get("/data/billTemplates/download", {billerId: billerId, id: id});
                },
                function (results) {
                    window.location.assign(this.controller.get("downloadUrl") + "downloadFileId" + results.downloadFileId);
                    this.showSuccessMessage("Successful downloaded email template.");
                },
                "An error occurred downloading an email template. Please try again later.");

        },
      }
    });

    // App.BillerSettingsController.childTabs.push(App.SettingsTab.create({
    //   linkTo: "biller.settings.billTemplates",
    //   name: "billTemplates",
    //   idx: 2
    // }));

    Ember.TEMPLATES['bill-template-upload-modal'] = Ember.Handlebars.compile(billTemplateUploadModal);
    App.BillTemplateUploadMixin = Ember.Mixin.create({
      application: Ember.inject.controller(),
      uploadedInfo: null,
      templateName: null,
      uploading:false,
      fileName:"",

      uploadActionButtons: [App.ModelDialogActionButton.create({label: settingsStrings.all.uploadMailTemplateCancel, actionName: "cancel"}),
        App.ModelDialogActionButton.create({
          label: settingsStrings.all.uploadMailTemplateConfirm, primary: true,
          bsType: "btn-primary", actionName: "confirm"
        })],

      billTemplateUploadUrl: Ember.computed("biller",{
        get: function() {
          return "/data/billTemplates/%@/upload".fmt(this.get("biller").id);
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


    Ember.TEMPLATES['biller/settings/billTemplates'] = Ember.Handlebars.compile(settingsBillTemplatesTemplate);
    App.BillerSettingsBillTemplatesController = App.BillerSettingsSubControllerBase.extend(App.CountryDetailsMixin,
                                                                                           App.ModalProducingControllerMixin,
                                                                                           App.BillTemplateUploadMixin, {
      application:Ember.inject.controller(),
      billerSettings:Ember.inject.controller(),
      name: "billTemplates",
      uploadedInfo: null,
      templateName: null,
      uploading:false,
      fileName:"",
      settingsStrings: settingsStrings,
      downloadUrl : "/download/billTemplate/download?",

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
