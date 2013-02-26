define([
  'models/step',
  'backbone',
  'backbone_localStorage'
], function(Step) {
  var StepList = Backbone.Collection.extend({

    model: Step,

    localStorage: new Backbone.LocalStorage('steps-bb'),

    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      };
      return this.last().get('order') + 1;
    },

    comparator: function( step ) {
      return step.get('order');
    }

  });

  return StepList
});
