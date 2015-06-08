// JS for session summary (where are all the chart logic is).
// From documentation at http://www.chartjs.org/docs/

Template.chart.rendered = function() {
	drawChart(); 
}

// make this global because why not 
chartData = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
    },
    {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
    }
    ]
  }

function drawChart(){
  
  var data = [
    {
      label: 'Homework',
      //fillColor : "rgba(220,220,220,0.5)",
      // fillcolor don't exist for scatter chart type
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: new Date('2011-04-11T11:45:00'), y: 5 }, 
        { x: new Date('2011-04-11T12:00:00'), y: 4 }, 
        { x: new Date('2011-04-11T12:15:00'), y: 3 }, 
        { x: new Date('2011-04-11T12:30:00'), y: 2 },
        { x: new Date('2011-04-11T12:45:00'), y: 1 }
      ]
    },
    {
      label: 'Procrastinating',
      //fillColor : "rgba(151,187,205,0.5)",
      strokeColor: '#007ACC',
      pointColor: '#007ACC',
      pointStrokeColor: '#fff',
      data: [
        { x: new Date('2011-04-11T13:00:00'), y: 5 }, 
        { x: new Date('2011-04-11T13:15:00'), y: 4 }, 
        { x: new Date('2011-04-11T13:30:00'), y: 3 }, 
        { x: new Date('2011-04-11T13:45:00'), y: 5 },
        { x: new Date('2011-04-11T14:00:00'), y: 3 }
      ]
    }
  ];

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  // http://dima117.github.io/Chart.Scatter/
  new Chart(ctx).Scatter(data, {
        bezierCurve: true,
        showTooltips: true,
        scaleShowHorizontalLines: true,
        scaleShowLabels: true,
        scaleType: "date",
        scaleLabel: "<%=value%>°C",
        scaleOverride: true,
        scaleSteps: 6,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: 1,

        // Number - The scale starting value
        scaleStartValue: 0
      });
}





/*// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");

var myBarChart = new Chart(ctx).Bar(data); //, options);

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
*/
/*
//We can also get the context of our canvas with jQuery. To do this, we need to get the DOM node out of the jQuery collection, and call the getContext("2d") method on that.

// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
var myNewChart = new Chart(ctx);
*/