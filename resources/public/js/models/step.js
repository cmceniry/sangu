define([
  'backbone',
  'backbone_localStorage'
], function() {

  var Step = Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('steps-bb'),

    defaults: {
      short: '',
      long: ''
    }
  });

  return Step;
});

