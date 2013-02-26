define([
  'jquery',
  'underscore',
  'backbone',
  'backbone_localStorage',
], function($, _, Backbone, BackboneLocalStorage) {
  var initialize = function() {
    window.alert("foo!");
  };

  return {
    initialize: function() {
      window.app("foo");
    }
  };
});
