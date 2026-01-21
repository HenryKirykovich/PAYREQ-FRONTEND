define(['application', 'billers', 'login', 'fingerprintjs2'], function (application, billers, login, fingerprint) {
  var setFingerprint = function () {
    var options = {
      excludes:
          {
            canvas: true,
            webgl: true,
            hardwareConcurrency: true,
            plugins: true,

            //default excludes:
            'enumerateDevices': true,
            'pixelRatio': true,
            'doNotTrack': true,
            'fontsFlash': true
          }
    };

    fingerprint.get(options, function (components) {
      var values = components.map(function (component) {
        return component.value
      });
      App.fingerprint = fingerprint.x64hash128(values.join(''), 31)
    })
  };
  if (window.requestIdleCallback) {
    requestIdleCallback(setFingerprint)
  } else {
    setTimeout(setFingerprint, 500)
  }

  // The index route for the customer-facing app will redirect to the billers route
  App.IndexRoute = Ember.Route.extend(App.AuthedRouteMixin, {
    beforeModel: function () {
      var authing = !this._super.apply(this, arguments);
      if (!authing) {
        var apiUser = this.controllerFor("application").get("userContext.apiOnly");
        if (apiUser) {
          this.transitionTo("user.personal");
        } else {
          this.transitionTo("billers");
        }
      } else return false;
    }
  });
});
