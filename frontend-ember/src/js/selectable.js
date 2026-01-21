define(['application'],  function() {

	App.SelectableTableMixin = Ember.Mixin.create({
		allSelected: false,

    selectAll: function() {
      var select = this.get("allSelected") || this.get("content").any(function(b) {return !b.get("selected");});
      this.get("content").forEach(function(b) {
        b.set("selected", select);
      });
      this.set("allSelected", select);
    }.observes("allSelected"),

		clearAllSelected: function() {
			this.set("allSelected", false);
		},

		getAllSelected: function() {
			return this.get("content").filterBy("selected");
		}
	});

});
