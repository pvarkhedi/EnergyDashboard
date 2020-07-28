['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('sharedGrid').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;

            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);
                if (point) {
                    //console.log(point["x"])
                    point.highlight(e);

                    var pt = point["x"]
                    getSeries().setData(
                    [
                        ["Black Coal", globalEnergyData["values"][pt][0]],
                        ["Distillate", globalEnergyData["values"][pt][1]],
                        ["Gas", globalEnergyData["values"][pt][2]],
                        ["Hydro", globalEnergyData["values"][pt][3]],
                        ["Pumps", globalEnergyData["values"][pt][4]],
                        ["Wind", globalEnergyData["values"][pt][5]],
                        ["Exports", globalEnergyData["values"][pt][6]],
                        //["Rooftop Solar", globalEnergyData["values"][pt][7]],
                    ]
                    );
                
                }
            }
        }
    );
});

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        { trigger: 'syncExtremes' }
                    );
                }
            }
        });
    }
}
var globalEnergyData = {
    keys: [],
    values: []
  };
  
  // function to do deep-copy on the global data structure
  function updateGlobalEnergyData(data) {
    globalEnergyData['values'] = [];
    for (var idx = 0; idx < data[0]['data'].length; idx ++) {
      var energyBreakup = data.map(elm => {return elm['data'][idx]});
      globalEnergyData['values'].push(energyBreakup);
    }
    globalEnergyData['keys'] = data.map(elm => elm['name']);
    //console.log(globalEnergyData)
  }

    Highcharts.ajax({  
        url: 'assets/springfield.json',  
        success: function(data) {
            var energyData = data.filter(function(elm) {
                return elm['type'] === 'power';
            }).map(function(elm) {
              var temp = []
              var values = elm["history"]["data"]
              for (var i = 0; i < values.length; i=i+6) {
                temp.push(values[i]);
              }
                return {
                  data: temp,
                  name: elm['id']
                };
            });
            console.log(energyData)
            updateGlobalEnergyData(energyData)
            makePieChart(globalEnergyData)
            var chartdiv = document.createElement('div');
            chartdiv.className = 'chart';
            document.getElementById('sharedGrid').appendChild(chartdiv);
            Highcharts.chart(chartdiv, {
                chart: {
                    type: 'area',
                    height: 250,
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: 'Generation',
                    font: 15,
                },
                yAxis: {
                    min: 0, max: 3000,
                    title: false,
                },
                xAxis: {
                    crosshair: {
                        width: 2,
                        color: 'black'
                    },
                    title: false,
                },
                tooltip:{
                    shared: true,
                    fontSize: "6px"
                },
                series: energyData
            })
        }  
    });

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.ajax({  
        url: 'assets/springfield.json',  
        success: function(data) {
            var priceData = data.filter(function(elm) {
                return elm['type'] === 'price';
            }).map(function(elm) {
                return {
                  data: elm["history"]["data"],
                  name: elm['id']
                };
            });
            console.log(priceData)
            var chartdiv = document.createElement('div');
            chartdiv.className = 'chart';
            document.getElementById('sharedGrid').appendChild(chartdiv);
            Highcharts.chart(chartdiv, {
                chart: {
                    type: 'line',
                    height: 150
                },
                title: {
                    text: 'Price',
                    font: 15
                },
                xAxis: {
                    labels: {
                        enabled: false,
                    },
                    title: false,
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    min: 0, max: 200,
                    title: false,
                },
                series: priceData
            })
        }  
    });
});

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.ajax({  
        url: 'assets/springfield.json',  
        success: function(data) {
            var temperatureData = data.filter(function(elm) {
                return elm['type'] === 'temperature';
            }).map(function(elm) {
                return {
                  data: elm["history"]["data"],
                  name: elm['id']
                };
            });
            console.log(temperatureData)
            var chartdiv = document.createElement('div');
            chartdiv.className = 'chart';
            document.getElementById('sharedGrid').appendChild(chartdiv);
            Highcharts.chart(chartdiv, {
                chart: {
                    type: 'line',
                    height: 150,
                },
                title: {
                    text: 'Temperature',
                    font: 15
                },
                xAxis: {
                    labels: {
                        enabled: false,
                    },
                    title: false,
                },
                legend: {
                    enabled: false,
                },
                yAxis: {
                    min: 40, max: 100,
                    title: false,
                },
                series: temperatureData
            })
        }  
    });
});

var getSeries = function() {
    return $('#pieGrid').highcharts().series[0];
};

function makePieChart(globalEnergyData) {
    var pieChart = Highcharts.chart( {
        chart: {
            renderTo: "pieGrid",
            type: 'pie'
        },
        plotOptions: {
            pie: {
                size: "100%",
                showInLegend: true,
                startAngle: 90,
                allowPointSelect: true,
                cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            legend: {
                layout: 'vertical',
                useHTML: true,
                verticalAlign: "top",
                //align: "top",
                labelFormatter: function () {
                    return "<div style='width:200px;'><span style='float:left;'>" + this.name + "</span><span style='float:right;margin-right: 30px;'>" + this.y + " kWh</span></div>";
                },
                margin: 50,
                padding: 0,
            },
    title:{
        text:''
    },
    series: [{
        data: [
            ["Black Coal", globalEnergyData["values"][0][0]],
            ["Distillate", globalEnergyData["values"][0][1]],
            ["Gas", globalEnergyData["values"][0][2]],
            ["Hydro", globalEnergyData["values"][0][3]],
            ["Pumps", globalEnergyData["values"][0][4]],
            ["Wind", globalEnergyData["values"][0][5]],
            ["Exports", globalEnergyData["values"][0][6]],
            //["Rooftop Solar", globalEnergyData["values"][0][7]],
        ]
    }],
    
});
}