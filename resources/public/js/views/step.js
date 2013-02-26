define([
  'backbone',
  'backbone_localStorage'
], function() {
  var StepView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( $('#step-tmpl').html() )

  });

  return StepView
});
