require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    backbone_localStorage: 'lib/backbone.localStorage',
    'text': 'lib/require.text'
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
  'collections/steps',
  'views/step.edit',
  'views/steps',
], function(Steps, StepEditView, StepsView) {

  var steps = new Steps();

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'new': 'editStep',
      'edit/:id': 'editStep'
    }
  });
  var router = new Router();

  var stepEditView = new StepEditView(router);
  var stepsView = new StepsView(steps);

  router.on("route:home", function() { steps.fetch(); stepsView.render(); });
  router.on("route:editStep", function(id) { stepEditView.render({id: id}); });
  Backbone.history.start();

// create index page for a Steps
// create a new page(?)
// create an edit page(?)

});

