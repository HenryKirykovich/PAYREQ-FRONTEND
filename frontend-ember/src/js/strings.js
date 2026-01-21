define(['ember', 'application'],
	function() {

    var walkMapUpdateVals = function(m, f) {
      var newMap = {};
      for (k in m) {
        var v = m[k];
        if (typeof v === "object") {
          newMap[k] = walkMapUpdateVals(v, f);
        } else if (typeof v === "string") {
          newMap[k] = f.call(v);
        } else {
          newMap[k] = v;
        }
      }
      return newMap;
    }

    var moddedStringsMap = function(sm, f) {
      return App.StringsMap.create({classifier: sm.get("classifier"),
                                    classifier2: sm.get("classifier2"),
                                    baseMap: walkMapUpdateVals(sm.get("baseMap"), f)});
    };

    App.StringsMap = Ember.Object.extend({
      baseMap: {},
      classifier: null,
      classifier2: null,

      init: function() {
        var props = $.extend(true, {}, this.get("baseMap")["all"], this.get("baseMap")[this.get("classifier")], this.get("baseMap")[this.get("classifier2")]);
        this.setProperties(props);
      },

      capitalised: Ember.computed("baseMap", "classifier", "classifier2", {
        get: function() {
          return moddedStringsMap(this, String.prototype.capitalize);
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      lowerCase: Ember.computed("baseMap", "classifier", "classifier2", {
        get: function() {
          return moddedStringsMap(this, String.prototype.toLowerCase);
        },
        set: function(key, newValue) {
          return newValue;
        }

      }),

      upperCase:Ember.computed("baseMap", "classifier", "classifier2", {
        get: function() {
          return moddedStringsMap(this, String.prototype.toUpperCase);
        },
        set: function(key, newValue) {
          return newValue;
        }

      })
    });

  }
);
