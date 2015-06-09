// set a new interval to update timer
Meteor.setInterval(function() {
 		console.log('updating current date'); 

 		Session.set('currentDate', new Date());

 		var ms = calculateTimeDiff(Session.get('currentDate'), Session.get('dateOfNextQuery')); 

 		if (ms <= 0) { // fire off entry query
 			$('#modal-query').modal('show');
 			Session.set('timeDiffMillSecs', 0); 
 		}
 		else {
 			Session.set('timeDiffMillSecs', ms);
 		}

	}, 1000 
); // calls every thousand milliseconds
// http://stackoverflow.com/questions/29650894/set-interval-in-meteor

// jquery test - doesn't work for some reason - maybe can't hide spans? (i don't think so)
// doesn't work inside of template.rendered, either 
//$('#timerText').hide();
//$('#timerText').fadeIn(100); //this.chart.get().options.animationSteps); 

Template.timer.events({ 

	'click #btn-new-entry': function() { 
		if (Session.get('currentSession')) { // check to make sure we're recording for a real session
			var parentId = Session.get('currentSession'); 
			var isActiveObservation = true; 
			var activityIntended = ActivityList.find(1)._id; 
			var activityActual = ActivityList.find(0)._id; 
			var engagement = 4;  
			var mood = 5; 
			Meteor.call('insertNewEntry', parentId, isActiveObservation, activityIntended, activityActual, engagement, mood); 
		}
	}

});

Template.timer.helpers({

	'sessionName': function() {
		return "Placeholder for code that fetches session name."; 
	}
});

Template.queryCountdown.helpers({

	'timeRemaining': function() { // returns formatted string of remaining time 
		return moment.utc(Session.get('timeDiffMillSecs')).format("mm:ss"); 
	}, 

	'chartUpdate': function() {
		console.log('chart is updating'); 
		
		var c = Template.instance().chart.get(); //Session.get('timerChart'); //Template.instance().chart.get(); 

		if (c) { // make sure not null
			var ms = Session.get('timeDiffMillSecs'); 

			if (ms < 0 ) ms = 0; 

			c.segments[0].value = ms; 
	 		c.segments[1].value = Session.get('timeInterval')*60000 - ms; 
	 		c.update(); 

	 		//Template.instance().chart.set(c); // Session.set('timerChart',c); //Template.instance().chart.set(c);  
	 			//^ triggers the template infinitely - not totally sure why. works without this line. (Not sure why changes carry over when c is never stored anywhere permanently.)
	 	}

 		// use Template.instance() instead of this inside of helpers - idk why
 		// http://stackoverflow.com/questions/15698678/how-do-i-modify-a-template-instance-from-an-event-handler-in-meteor-without-sess
	}

});


// Rendered chart time
Template.queryCountdown.rendered = function() {
	// gave up on reactive vars, using session as a quickfix - nope; nevermind; chart objects too big to fit in session
	//Session.set('timerChart', drawTimerChart(Session.get('timeDiffMillSecs'))); 
	this.chart.set(drawTimerChart(Session.get('timeDiffMillSecs'))); 
}

Template.queryCountdown.created = function() {
	// ReactiveVars are like Sessions, but their scope is limited to the template of their instantiation. 
	this.chart = new ReactiveVar(null); 
	//this.foo = new ReactiveVar("DO I WORK?"); 

	  
}

function drawTimerChart(ms) { // take milliseconds (int)

	// scope issues - stuck this directly in data as quickfix. 
	//var intervalLength = Session.get('timeInterval') * 60000; // length of interval, converted from minutes to milliseconds

	var data = [

	{
	    value: ms,
	    color:"#F7464A", // bright red 
	    highlight: "#FF5A5E", // light, light red 
	},

	{
	    value: Session.get('timeInterval')*60000 - ms,
	    color:"#601C1E", // darker shade red
	    highlight: "#FF5A5E",
	}]; 

	
	//Get context with jQuery - using jQuery's .get() method.
	var canvas = $("#timerChart"); 

	//This will get the first returned node in the jQuery collection.
	var ctx = canvas.get(0).getContext("2d");
	
	canvas.width = window.innerWidth*0.75;
    canvas.height = window.innerWidth*0.75;

	return new Chart(ctx).Doughnut(data, {
    	animateScale: true,
    	animationEasing: "easeOutExpo"
	});

	// http://dima117.github.io/Chart.Scatter/
	//new Chart(ctx).Pie(data);
	
}

Template.scrollableDropdown.events({

	'click li': function(event, template) {
		var activityId = this._id; 
		Session.set('activityActual', activityId); 

		$('.view-div').hide();
		$('#view-engagement').show();
	}
}); 

Template.scrollableDropdown.helpers({
	
	'activity': function () {
		return ActivityList.find({}, {sort: {name: 1}}); // sort: sorts list according to value of 'score,' in this case in descending order (specified by -1) - returned list is sorted. 
	  	// sorting: first by number, descending; then, (if tied), by name, ascending 
	}
}); 

Template.queryModal.rendered = function() {
	$('.view-div').hide();
	$('#view1').show();  
}

Template.procrastinationQuery.events({
	'click #btn-working-yes': function() {
		// not procrastinating. 
		
		Session.set('activityActual', Session.get('activityIntended')); 

		$('.view-div').hide();
		$('#view-engagement').show();

	},

	'click #btn-working-no': function() {
		// procrastinating. 
		$('.view-div').hide();
		$('#view-actual-activity').show();
	}
}); 

Template.engagementForm.events({
	'click li.scale-degree': function(event, target) {
		Session.set('engagement', event.target.dataset.value);
		$('.view-div').hide();
		$('#view-mood').show();
	}
}); 

Template.engagementForm.helpers({
	'scale': [1,2,3,4,5],

	'activity': function() {
		return ActivityList.findOne(Session.get('activityActual')).name;
	}
}); 

Template.moodForm.events({
	'click li.scale-degree': function(event, target) {
		console.log(event.target); 
		Session.set('mood', event.target.dataset.value);
		
		// finally make the actual entry insertion. 
		Meteor.call('insertNewEntry', Session.get('currentSession'), 
									Session.get('isActiveObservation'), 
									Session.get('activityIntended'), 
									Session.get('activityActual'), 
									Session.get('engagement'), 
									Session.get('mood')); 

		// dismiss the modal, reset the clock
		$('#modal-query').modal('hide'); 

		var d = new Date().getTime(); 
		Session.set('dateOfNextQuery', new Date(d + Session.get('timeInterval')*60000)); // date of upcoming query

	}
}); 

Template.moodForm.helpers({
	'scale': [1,2,3,4,5]
}); 

Template.procrastinationQuery.helpers({
	'intendedActivity': function() {
		return ActivityList.findOne(Session.get('activityIntended')).name;
	}
}); 

// just in case you're curious: 
/*
	isActive --> procrastinating? --> (if no, skip)what are you actually doing? --> how engaged? --> mood? --> exit
	!isActive --> what are you doing? --> how engaged? --> mood? --> exit? 
*/