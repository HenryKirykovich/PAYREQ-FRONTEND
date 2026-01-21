define(['text!templates/components/item-select.html',
        'text!templates/components/textarea-numbered.html',
        'text!templates/components/scroll-bottom-event.html',
  'application', 'textarea', 'placeholder'], function(itemSelectTemplate, textareaNumberedTemplate, scrollBottomEventTemplate) {

	App.FormHelperMixin = Ember.Mixin.create({
		errorOnField: function(field, message) {
      Ember.$(field).find("~ span.error-message").remove();
			Ember.$(field).focus()
										.after(Ember.$("<span>").addClass("error-message control-label").text(message))
										.closest(".form-group")
										.addClass("has-error");
			return false;
		},

		removeErrors: function(container) {
			Ember.$(container).find("span.error-message").remove();
			Ember.$(container).find(".form-group").removeClass("has-error");
		},

	});

  Ember.TEMPLATES['components/item-select'] = Ember.Handlebars.compile(itemSelectTemplate);
  App.ItemSelectComponent = Ember.Component.extend({
    content: [],
    prompt: null,
    promptDisabled : true,
    optionValuePath: null,
    optionLabelPath: null,
    selection: null,
    disabled: false,
    tagName : "span",

    init: function () {
      this._super();
      if (!this.get('content')) {
        this.set('content', []);
      }
    },

    noSelection: Ember.computed("selection", {
        get: function(key, value) {
          if(this.get("selection")){
            return false;
          }
          return true;
        },
        set: function(key, newValue) {
          return newValue;
        }
    }),

    actions: {
      change: function () {
        var test = this.$('select')[0];
        var selectedIndex = this.$('select')[0].selectedIndex;
        var content = this.get('content');

        // decrement index by 1 if we have a prompt
        var hasPrompt = !!this.get('prompt');
        var contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
        var _selection = content[contentIndex];

        var _pre_selection = this.get('selection');
        this.sendAction('willChangeAction', _selection);

        if (this.get('optionValuePath') && _selection) {
          this.set('selection', Ember.get(_selection, this.get('optionValuePath')));
        } else {
          this.set('selection', _selection);
        }

        this.sendAction('didChangeAction', _pre_selection, _selection);
      }
    }
	});

  App.IsEqualHelper = Ember.Helper.helper(function(params){
    var left = params[0];
    var right = params[1];
    return left === right;
  });

  App.ReadPathHelper = Ember.Helper.helper(function(params) {
    var object = params[0];
    var path = params[1];
    if(path){
      return Ember.get(object, path);
    }
    return object;
  });

  App.IsNotHelper = Ember.Helper.helper(function(params) {
    var value = params[0];
    return !value;
  });

  App.FormHelperController = Ember.Mixin.create({
      actions:{
          didChangeAction: function(_pre_selection, _selection){
            this.send("changedSelection", _pre_selection, _selection);
          }
      }
  });


    Ember.TEMPLATES['components/textarea-numbered'] = Ember.Handlebars.compile(textareaNumberedTemplate);
    App.TextareaNumberedComponent = Ember.Component.extend({

        content: null,
        placeholder: '',

        init: function () {
            this._super();
            if (!this.get('content')) {
                this.set('content', "");
            }
        },

        didInsertElement: function() {
            // set-number
            $("#editor[placeholder]").placeholder();
            $("#editor").linenumbers({col_width:'25px'});

        },

        actions: {

        }
    });

    App.Scrolling = Em.Mixin.create({

        bindScrolling: function(opts) {
            var onScroll, _this = this;

            getDocHeight = function(){
                var D = document;
                return Math.max(
                    D.body.scrollHeight, D.documentElement.scrollHeight,
                    D.body.offsetHeight, D.documentElement.offsetHeight,
                    D.body.clientHeight, D.documentElement.clientHeight
                );
            },

            onScroll = function(){
                if($(window).scrollTop() >=  getDocHeight() - $(window).height() - 100) {
                   return _this.scrolled();
                }
            };

            $(document).bind('touchmove', onScroll);
            $(window).bind('scroll', onScroll);
        },

        unbindScrolling: function() {
            $(window).unbind('scroll');
            $(document).unbind('touchmove');
        }

    });

    Ember.TEMPLATES['components/scroll-bottom-event'] = Ember.Handlebars.compile(scrollBottomEventTemplate);
    App.ScrollBottomEventComponent = Ember.Component.extend(App.Scrolling, {

        init: function () {
            this._super();
            if (!this.get('content')) {
                this.set('content', "");
            }
        },

        didInsertElement: function() {
            this.bindScrolling();
        },

        willDestroyElement: function() {
            this.unbindScrolling();
        },

        scrolled: function() {
           this.sendAction('bottomScroll');
        },

        actions: {

        }
    });


});
