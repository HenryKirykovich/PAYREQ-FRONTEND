define(['i18n!nls/settings', 'text!templates/components/file-upload.html', 'application'],
    function(translation, fileUploadTemplate){
Ember.TEMPLATES['components/file-upload'] = Ember.Handlebars.compile(fileUploadTemplate);
App.FileUploadComponent = Ember.Component.extend({
    strings: translation,
	progress: 0,
    errorMessage: null,
	filename: "",
	uploading: false,
	uploadId: null,
	response: null,
	url: null,
	didInsertElement: function() {
		var me = this;
		$("#fileUpload").fileupload({
			formData: {"__anti-forgery-token": App.csrf.token,
					   "__pr-version" : App.prVersionCurrent},
			url: me.get('url'),
			add: function(e, data) {
				me.set('filename', data.files[0].name);
				data.submit();
        me.sendAction("uploadingStarted");
				me.set('uploading', true);
			},
			progress: function(e, data) {
				me.set('progress', parseInt(data.loaded / data.total * 100, 10));
			},
			done: function(e, data) {
				var result = data.result;
				if (typeof result.success !== undefined) {
                    if (result.message !== undefined){
                        me.set('errorMessage', me.get("strings.all.templateErrors")[result.message]);
                    }
                    me.set('progress', 100);
					me.set('uploadId', result.id);	//for asynch executions
					me.set('response', result.response); //for synch executions
				}
			}
		});
	},

	willDestroyElement: function() {
      this.set('uploading', false);
      this.set('uploadId', null);
      this.set('response', null);
  }
});
});
