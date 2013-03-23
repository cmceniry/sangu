define([
  'text!views/step.edit.html',
  'backbone',
  'backbone_localStorage'
], function(StepHTML) {
  var StepView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( StepHTML )

  });

  return StepView
});
