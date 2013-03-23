define([
  'backbone',
  'backbone_localStorage',
  'models/step',
  'text!views/step.edit.html'
], function(Backbone, BackboneLocalStorage, Step, StepEditHTML) {

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        };
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  var StepEditView = Backbone.View.extend({
    el: '.steps',
    initialize: function(router) {
      this.router = router;
    },
    render: function(options) {
      var that = this;
      if (options.id) {
        that.step = new Step({id: options.id});
        that.step.fetch({
          success: function(step) {
            var template = _.template(StepEditHTML, {step: step});
            that.$el.html(template);
          }
        });
      } else {
        var template = _.template(StepEditHTML, {step: null});
        this.$el.html(template);
      };
    },
    events: {
      'submit .edit-step-form': 'saveStep',
      'click .delete': 'deleteStep'
    },
    saveStep: function(ev) {
      var that = this;
      var stepDetails = $(ev.currentTarget).serializeObject();
      var step = new Step();
      step.save(stepDetails, {
        success: function() {
          that.router.navigate('', {trigger: true});
        }
      });
      return false;
    },
    deleteStep: function(ev) {
      var that = this;
      this.step.destroy({
        success: function() {
          that.router.navigate('', {trigger: true});
        }
      });
      return false;
    }
  });

  return StepEditView;
});
