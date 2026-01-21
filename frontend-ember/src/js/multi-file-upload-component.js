define(['i18n!nls/settings', 'text!templates/components/multi-file-upload.html', 'application'],function(translation, multiFileUploadTemplate){
Ember.TEMPLATES['components/multi-file-upload'] = Ember.Handlebars.compile(multiFileUploadTemplate);
App.MultiFileUploadComponent = Ember.Component.extend({
    strings: translation,
	progress: 0,
	filenames: [],
	uploading: false,
    uploadIds: [],
	numberOfFiles: null,
	uploadId: null,
	response: null,
	url: null,
    errorMessage: null,

    hasSingleFile: Ember.computed("numberOfFiles", {
        get: function() {
            return this.get("numberOfFiles") === 1;
        },
        set: function(key, newValue) {
            return newValue;
        }
    }),


    didInsertElement: function() {
		var me = this;
        this.set('progress', 0);
        this.set('uploadIds', []);
		$("#fileUpload").fileupload({
			formData: {"__anti-forgery-token": App.csrf.token,
					   "__pr-version" : App.prVersionCurrent},
			url: me.get('url'),
			add: function(e, data) {
                me.set('filenames', data.originalFiles);
                me.set('filename', data.files[0].name);
                me.set('numberOfFiles', data.originalFiles.length);
				data.submit();
        		me.sendAction("uploadingStarted");
				me.set('uploading', true);
			},
			progress: function(e, data) {
				if(me.get('numberOfFiles') ===  1){
                    me.set('progress', parseInt(data.loaded / data.total * 100, 10));
				} else {
                    me.set('progress', parseInt(me.get('uploadIds').length / me.get('numberOfFiles') *  100, 10));
				}
			},
			done: function(e, data) {
				var result = data.result;
				if (typeof result.success !== undefined) {
                    if (result.message !== undefined){
                        me.set('errorMessage', me.get("strings.all.templateErrors")[result.message]);
                    }

                    me.get('uploadIds').push(result.id);

                    //update progress
                    if(me.get('numberOfFiles') ===  1){
                        me.set('progress', 100);
                        me.set('uploadId', result.id);
                    } else {
                        me.set('progress', parseInt(me.get('uploadIds').length / me.get('numberOfFiles') *  100, 10));
                        me.set('uploadId', result.id);
                    }

					me.set('response', result.response); //for synch executions
				}
			}
		});
	},

	willDestroyElement: function() {
      this.set('uploading', false);
      this.set('uploadId', null);
      this.set('response', null);
      this.set('progress', 0);
      this.set('uploadIds', []);
  }
});
});
