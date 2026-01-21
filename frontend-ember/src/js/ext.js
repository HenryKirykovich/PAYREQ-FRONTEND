/*
	Add javascript prototype extensions here in this file.
*/
define(['ember'], function() {

	// String prototype extensions

	/*
		In later versions of ember, there is a "humanize" extension function to the String
		prototype, which would replace this nicely.
	*/
	String.prototype.readable = function() {
		return this.decamelize()
							.replace(/_id$/, '')
      				.replace(/_/g, ' ')
      				.replace(/^\w/g, function(s){
				        return s.toUpperCase();
      				});
	};

	String.isBlank = function(str) {
		return Ember.isNone(str) || str === "";
	};

});
