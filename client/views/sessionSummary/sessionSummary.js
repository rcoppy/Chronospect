// JS for session summary (where are all the chart logic is).
// From documentation at http://www.chartjs.org/docs/

Template.sessionSummary.helpers({
  'sessionName': function() {
    return SessionList.findOne({_id: Session.get('selectedSession')}).name; 
  }
});

Template.chart.rendered = function() {
	drawChart(); 
}

function getChartData() {
  // engagement over time, with activity  --- currently the only one implemented 
  // mood over time, with activity
  // engagement as function of mood 
  // mood as function of engagement 
  var session = Session.get('selectedSession'); 

  var entries = EntryList.find({parentId: session}); 
  var activities = [];

  entries.forEach(function(doc) {
    // add activity of entry to array - but check for duplicates. 
    var flag = true; 
    var arrayLength = activities.length;
    for (var i = 0; i < arrayLength; i++) {
      if (doc.activityActual === activities[i]) {
        flag = false;
      }
    }

    if (flag) { // if not a duplicate, add activity key to array 
      activities.push(doc.activityActual); 
    }
  }); 

  var data = []; 

  var l = activities.length; // putting this directly in for loop crashes for some reason 
  for (var i = 0; i < l; i++) {
    var act = ActivityList.findOne({_id: activities[i]});
    var label = act.name;
    var strokeColor = (i+1) * 0xF16220; 
    var pointColor = (i+1) * 0xF16220; 
    var pointStrokeColor = (i+1) * 0xfff; 

    var points = []; 

    EntryList.find({parentId: session, activityActual: act._id}).forEach(function(doc) {
      points.push({x: doc.time, y: doc.engagement});
    }); 

      /*data: [
        { x: new Date('2011-04-11T11:45:00'), y: 5 }, 
        { x: new Date('2011-04-11T12:00:00'), y: 4 }, 
        { x: new Date('2011-04-11T12:15:00'), y: 3 }, 
        { x: new Date('2011-04-11T12:30:00'), y: 2 },
        { x: new Date('2011-04-11T12:45:00'), y: 1 }
      ]*/ 

    data.push({
      label: label,
      strokeColor: strokeColor,
      pointColor: pointColor,
      pointStrokeColor: pointStrokeColor,
      data: points
    });  
  }

  return data; 

}

function drawChart(){
  
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  
  

  return new Chart(ctx).Scatter(getChartData(), {
        bezierCurve: true,
        showTooltips: true,
        scaleShowHorizontalLines: true,
        scaleShowLabels: true,
        scaleType: "date",
        scaleLabel: "<%=value%>",
        scaleOverride: true,
        scaleSteps: 6,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: 1,

        // Number - The scale starting value
        scaleStartValue: 0,
        responsive: true // scale with changes in window size 
      }); 
  // http://dima117.github.io/Chart.Scatter/
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