define([
  'backbone',
  'backbone_localStorage'
], function() {

  var Step = Backbone.Model.extend({
    defaults: {
      short: '',
      long: ''
    }
  });

  return Step;
});

