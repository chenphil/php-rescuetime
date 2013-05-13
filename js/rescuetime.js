// Generated by CoffeeScript 1.6.2
(function() {
  var RescueTime;

  RescueTime = (function() {
    function RescueTime(chartid) {
      var context;

      context = document.getElementById(chartid).getContext("2d");
      this.chart = new Chart(context);
    }

    RescueTime.prototype.request = function(url, type) {
      var _this = this;

      return $.get(url, {
        type: type
      }).done(function(data) {
        var _ref;

        data = JSON.parse(data);
        console.log(data);
        return _this.draw(data['type'], data['data'], (_ref = data['labels']) != null ? _ref : {});
      }).fail(function(error) {
        return console.log(error);
      });
    };

    RescueTime.prototype.draw = function(type, data, display) {
      var dataset, key, labels, options, total, value, _ref, _ref1, _ref2;

      if (display == null) {
        display = {};
      }
      console.log(type, data, display);
      switch (type) {
        case 'radar':
          labels = [];
          dataset = {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: []
          };
          total = 0;
          for (key in data) {
            value = data[key];
            labels.push((_ref = display[key]) != null ? _ref : key);
            dataset.data.push(value);
            total += value;
          }
          _ref1 = dataset.data;
          for (key in _ref1) {
            value = _ref1[key];
            dataset.data[key] = value / total;
          }
          data = {
            labels: labels,
            datasets: [dataset]
          };
          options = {
            animationEasing: "easeInOutQuart"
          };
          console.log(data);
          return this.chart.Radar(data, options);
        case 'bar':
          labels = [];
          dataset = {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            data: []
          };
          for (key in data) {
            value = data[key];
            labels.push((_ref2 = display[key]) != null ? _ref2 : key);
            dataset.data.push(value);
          }
          data = {
            labels: labels,
            datasets: [dataset]
          };
          options = {
            animationEasing: "easeInOutQuart"
          };
          console.log(data);
          return this.chart.Bar(data, options);
      }
    };

    return RescueTime;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).RescueTime = RescueTime;

}).call(this);
