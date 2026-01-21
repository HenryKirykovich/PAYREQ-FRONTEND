requirejs.config({
  baseUrl: "js",
    packages: [{
        name: 'moment',
        location: 'lib/moment',
        main: 'moment'
    }],
  paths: {
    jquery: 'lib/jquery/dist/jquery.min',
    jqueryUI: 'lib/jquery-ui/jquery-ui.min',
    ember: 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.11.3/ember.min',
    emberdata: 'https://cdnjs.cloudflare.com/ajax/libs/ember-data.js/2.11.3/ember-data.min',
    emberTemplateCompiler: 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.11.3/ember-template-compiler',
    handlebars: 'lib/handlebars/handlebars.min',
    momenttimezone: 'lib/moment-timezone/builds/moment-timezone-with-data.min',
    text: 'lib/text/text',
    i18n: 'lib/requirejs-i18n/i18n',
    bootstrap: 'lib/bootstrap/dist/js/bootstrap.min',
    'jquery.ui.widget': 'vendor/file-upload/jquery.ui.widget',
    selectize: 'vendor/selectize/selectize',
    textarea: 'vendor/textarea/jquery-linenumbers',
    placeholder: 'vendor/textarea/jquery-placeholder',
    jqueryIframeTransport: 'vendor/file-upload/jquery.iframe-transport',
    jqueryFileUpload: 'vendor/file-upload/jquery.fileupload',
    paydock: 'vendor/paydock/v1/paydock.min',
    datatables: 'vendor/dataTables/1.10.19/js/jquery.dataTables.min',
    zingChart: 'vendor/zingchart/zingchart.min',
    fingerprintjs2: 'lib/fingerprintjs2/fingerprint2',
  },
  shim: {
    'jqueryUI': {
      deps: ['jquery']
    },
    'ember': {
      deps: ['jquery', 'jqueryUI', 'bootstrap']
    },
    'emberdata': {
      deps: ['ember']
    },
    'handlebars': {
      deps: ['jquery']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'selectize': {
      deps: []
    },
    'textarea': {
      deps: ['jquery']
    },
    'placeholder': {
      deps: ['jquery']
    },
    'jqueryIframeTransport': {
      deps: ['jquery']
    },
    'jqueryFileUpload': {
      deps: ['jqueryIframeTransport']
    },
    'paydock': {
      deps: []
    },
    'datatables': {
      deps:['jquery']
    },
    'zingChart': {
      deps:[]
    },
    'fingerprint': {
      deps:[]
    }
  },

  config: {
    'application': {
      applicationName: "Payreq"
    },
    'document-viewer': {
        viewerJsPath: "/js/vendor/pdfjs-2.9.359-dist/web/viewer.html?file=%@",
        viewerJsPathInternetExplorer: "/js/vendor/Viewer.js/index.html#%@"
    },
    'i18n': {
      locale: (function(){
          try{
              var browserLang = navigator.language && navigator.language.substring(0, 2) === "fr" ? "fr" : "en";
              var previouslySelectedLang = localStorage.getItem('language');
              return previouslySelectedLang || browserLang ;
          }catch(ex){
              return 'en';
          }
      })()
    }
  },

  waitSeconds: 60

});

define(['application',
        'login',
        'payerlogin',
        'customer-index',
        'billers',
        'contacts',
        'registrations',
        'incoming-registrations',
        'bills',
        'invoices',
        'jobs',
        'reports',
        'settings',
        'settings-accounting',
        'settings-biller',
        'settings-connections',
        'settings-consent',
        'settings-users',
        'settings-payments',
        'settings-bill-templates',
        'errors',
        'verify',
        'account-email-update',
        'email-unsubscribe',
        'agent-consent',
        'registration-confirmation',
        'user-settings'], function() {
  App.sessionLogin();
});

