
require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    backbone_localStorage: 'lib/backbone.localStorage',
  },
  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone_localStorage': {
      deps: ['backbone']
    }
  }
});

require([
  'models/step',
  'collections/steps',
  'views/step',
  'views/app',
  'app'
], function(Step, Steps, StepView, AppView, App) {
  $('#sangu').html("<h1>Test!</h1>");
});

