define(['text!templates/components/modal-dialog.html', 'application'],function(modalDialogTemplate) {

	App.ModelDialogActionButton = Ember.Object.extend({
		label: "",
		primary: false,
		actionName: "close",
		bsClass: "btn-default",
		closeOnly: false,
		noClose: false
	})

	Ember.TEMPLATES['components/modal-dialog'] = Ember.Handlebars.compile(modalDialogTemplate);
	Ember.TEMPLATES['empty-modal'] = Ember.Handlebars.compile("<div class='empty'></div>");
	App.ModalDialogComponent = Ember.Component.extend({
		actionButtons: [],

		secondaryButtons: Ember.computed("actionButtons", {
      get: function() {
  			return (this.get("actionButtons") || []).filterBy("primary", false);
      },
      set: function(key, newValue) {
        return newValue;
      }
		}),

		primaryButton: Ember.computed("actionButtons", {
      get: function() {
  			return (this.get("actionButtons") || []).filterBy("primary", true).objectAt(0);
      },
      set: function(key, newValue) {
        return newValue;
      }
		}),

		didInsertElement: function() {
			this.$("div.modal").modal({show: true}).on("hidden.bs.modal", $.proxy(function() {
				this.sendAction("onClose");
			}, this));
		},
		isPrimaryDisabled: Ember.computed({
      get: function() {
			  return false;
      },
      set: function(key, newValue) {
        return newValue;
      }
		}),

		actions: {
			close: function() {
				this.$("div.modal").modal("hide");
			},

			actionButtonClicked: function(btn) {
			  var me = this;
		      if (!btn.get("noClose"))
		        this.$("div.modal").modal("hide");
			  if (!btn.get("closeOnly"))
			    this.sendAction(btn.get("actionName"), function() { me.$("div.modal").modal("hide") });
			}
		}
	});

	App.ModalProducingControllerMixin = Ember.Mixin.create({
		showModal: function(templateName) {
			this.send("openModal", templateName, this);
		},

		hideModal: function() {
			this.send("closeModal");
		}
	});
});
