/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function ($, my) {

  my.lineWithFocusChart = recline.View.nvd3.Base.extend({
    initialize: function(options) {
      var self = this;
      self.graphType = 'lineWithFocusChart';
      recline.View.nvd3.Base.prototype.initialize.call(self, options);
      self.state.set('computeXLabels', true);
      self.menu = new my.lineWithFocusChartControls({
        model: self.model,
        state: self.state,
        parent: self
      });
    },
    render: function(){
      var self = this;
      recline.View.nvd3.Base.prototype.render.call(self, {});
    },
    getDefaults: function(){
      var self = this;
      return {
        options: {
          xAxis:{
            tickFormat: function(id) {
              return (self.chartMap) ? self.chartMap.get(id) : id;
            }
          }
        }
      };
    }
  });

  my.lineWithFocusChartControls = recline.View.nvd3.BaseControl.extend({
    _template: '<div class="form-group checkbox">' +
                '<label for="control-chart-compute-x-labels">' +
                '<input type="checkbox" id="control-chart-compute-x-labels" {{#computeXLabels}}checked{{/computeXLabels}}/> X values as labels' +
                '</label>' +
              '</div>',
    initialize: function(options){
      var self = this;
      recline.View.nvd3.BaseControl.prototype.initialize.call(self, options);
    },
    render: function(){
      var self = this;
      recline.View.nvd3.BaseControl.prototype.render.call(self, {});
      self.$el.find('#control-chart-container').append(Mustache.render(self._template, self.state.toJSON()));
    },
    getUIState:function(){
      var self = this;
      var computedState = recline.View.nvd3.BaseControl.prototype.getUIState.call(self, {});
      computedState.computeXLabels = $('#control-chart-compute-x-labels').is(':checked');
      return computedState;
    }
  });
})(jQuery, recline.View.nvd3);