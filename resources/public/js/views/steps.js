define([
  'text!views/steps.html',
  'backbone',
  'backbone_localStorage'
], function(StepsHTML, B, BL) {
  var StepsView = B.View.extend({
    el: '.steps',
    initialize: function(steps) {
      this.steps = steps;
    },
    render: function() {
      this.$el.html(_.template(StepsHTML, {steps: this.steps.models}));
    },
  });

  return StepsView;
})
