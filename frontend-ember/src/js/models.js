define(['application'], function() {
	App.ApplicationAdapter = DS.RESTAdapter.extend({
		namespace: 'data'
	});

	var attr = DS.attr;

	// App.Account = DS.Model.extend({
	// 	name: attr(),
	// 	balance: attr(),
	// 	transactions: DS.hasMany('transaction', {async: true})
	// });


	//Payreq Adapter
	// ****************************************
	/* Payreq REST API will be/is structured:

		/auth/
			bills/
				all?customer=xxx
				forReview??customer=xxx
				sent?customer=xxx

		


	*/




});
