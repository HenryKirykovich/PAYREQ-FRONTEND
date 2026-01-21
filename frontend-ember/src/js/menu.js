define(['i18n!nls/globals',
	'text!templates/components/context-menu.html',
				'text!templates/components/user-context-menu.html',
				'application', 'modal-dialog', 'emberdata'], function(globalStrings, contextMenuTemplate, userContextMenuTemplate) {

	App.ContextMenuItemsTransform = DS.Transform.extend({
		serialize: function(value) {
	    	return null; //don't serialise - probably no need
		},
		deserialize: function(value) {
			if (typeof value == "object") {
				return $.map(value, function(elem) {
					return Ember.Object.create(elem);
				});
			}
		}
	});

	App.WithContextMenuRouteMixin = Ember.Mixin.create({
		thisIsTheContext: function(contextEntity, type, allowSwitch) {
			var appController = this.controllerFor("application");
			var changeEntity = function(entity) {
				var newEntity = (entity.set) ? entity : Ember.Object.create(entity);

				newEntity.set("type", type);
				newEntity.set("allowSwitch", allowSwitch);
				appController.changeEntityContext(newEntity);
			};

			if (contextEntity.then) {
				contextEntity.then(changeEntity);
			} else {
				changeEntity(contextEntity);
			}
		}
	});

	Ember.TEMPLATES['components/context-menu'] = Ember.Handlebars.compile(contextMenuTemplate);
	App.ContextMenuComponent = Ember.Component.extend({
	});


	Ember.TEMPLATES['components/user-context-menu'] = Ember.Handlebars.compile(userContextMenuTemplate);
	App.UserContextMenuComponent = Ember.Component.extend({
	  referBusinessButtons: [App.ModelDialogActionButton.create({label: "Close", actionName: "cancel"})],
	  globalStrings: globalStrings,

    actions: {
      logout:function() {
        this.sendAction('logout');
      },
      switchBillers:function() {
        this.sendAction('switchBillers');
      },
		goToAccountSettings:function() {
        this.sendAction('goToAccountSettings');
      },
        goToManageAutopayments:function() {
            this.sendAction('goToManageAutopayments');
        },
        goToManageCards:function() {
            this.sendAction('goToManageCards');
        },

      showReferralMessage: function() {
        this.sendAction("showReferralMessage", this.get("referBusinessButtons"));
      },
    }
	});

});
