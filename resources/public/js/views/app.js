define([
  'backbone',
  'backbone_localStorage'
], function() {
  var AppView = Backbone.View.extend({

    el: '#sangu',

    initialize: function() {
      alert('ALERT!');
    }

  });

  return AppView;
});
