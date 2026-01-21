define(['module', 'text!templates/components/document-viewer.html', 'application'],  function(module, documentViewerTemplate) {

	function isIEBrowser() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older
			return true
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11
			return true;
		}

		// other browser
		return false;
	}

	App.DocumentViewerComponent = Ember.Component.extend({
		documentUrl: null,
		tagName: "iframe",
		allowfullscreen: true,
		webkitallowfullscreen: true,
		viewerClass: null,
		showDocumentName: true,
		attributeBindings: ["src", "allowfullscreen", "webkitallowfullscreen"],
		classNameBindings: ["viewerClass"],

		src: Ember.computed("documentUrl", {
      get: function() {
      	if (isIEBrowser()) {
			  return module.config().viewerJsPathInternetExplorer.fmt(this.get("documentUrl"));
		} else {
			return module.config().viewerJsPath.fmt(encodeURIComponent(this.get("documentUrl")));
		}
      },
      set: function(key, newValue) {
        return newValue;
      }
		}),

		didInsertElement: function() {
			if (!this.get("showDocumentName")) {
				var iframe = this.$()[0];
				var documentLoadFunc = function() {
					if (iframe.contentDocument.URL != "about:blank") {
						Ember.$("head", iframe.contentDocument)
								 .append(Ember.$("<style>", iframe.contentDocument)
															.text("#documentName{display:none}"));
					} else {
						Ember.run.later(this, documentLoadFunc, 100);
					}
				};
				documentLoadFunc();
			}

		}
	});

});
