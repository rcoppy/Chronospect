Template.settingsGeneral.rendered = function() { 
	setCSSBodyOffset(); 
};

Template.sessionNameModal.events({

	// this doesn't work for some reason - wasted too much time trying to figure it out
	//'submit #form-set-session-name': function(event, template) {
		
	'click #btn-start-recording': function(event, template) {
	    event.preventDefault(); // stop automatic page refresh

	    console.log("form submitted"); 

	    // old way: 
	    //var playerNameVar = theTemplate.find('#playerName').value;
	    
	    // new way: 

	    //$('#sessionNameTextbox').hide(); <-- this works 

	    var sessionName = $('#sessionNameTextbox').val(); 

	    console.log("session name: "+sessionName); 

	    // reset input field
	    $('#sessionNameTextbox').val(''); 

		// add a new session to the database. - time, user auto-filled: todo: define name 
		Meteor.call('insertNewSessionRecord', Session.get('timeInterval'), sessionName, function(err, newSession) {
  			if (err) { // callback function: http://stackoverflow.com/questions/10677491/how-to-get-meteor-call-to-return-value-for-template
  				console.log(err);
  			}
  			else {
				Session.set('currentSession', newSession);
				console.log(newSession); 
				console.log("current session: "+Session.get('currentSession'));	
			}

		});

		// move to timer page 	
		switchPageWait('timer');

		/*
		// ---Set in home (modal)---
		//Session.set('isActiveObservation', );   --- works

		// ---Set in settingsActive---
		//Session.set('activityIntended', );

		// ---Set during runtime--- 
		//Session.set('activityActual ', ); 
		//Session.set('engagement ', ); 
		//Session.set('mood ', ); 
		
		// ---set by click event of an interval---
		//Session.set('timeInterval', )  -- works

		// currentSession: the session currently being recorded to is stored - will be accessed in the timer. 
		*/ 
	}

}); 

Template.intervalsList.helpers({

	'interval': [
		1,
		5,
		10,
		15,
		30,
		45,
		60
	]

});

Template.intervalIcon.events({
	'click': function (event, template) {
		var interval = event.target.dataset.interval; 
		
		Session.set('timeInterval', interval);
		Session.set('dateOfNextQuery', new Date(new Date() + Session.get('timeInterval')*60000)); // date of upcoming query
		console.log(interval);  

		// popup start recording modal
		$('#modal-start-recording').modal('show'); 
	}
}); 


/*

This is too complicated to deal with right now. 

Template.intervalIcon.rendered = function() {
	drawIcon(40); 
}

function drawIcon(interval) {

	var data = [

	{
	    value: interval,
	    color:"#F7464A",
	    highlight: "#FF5A5E",
	},

	{
	    value: 60-interval,
	    color:"#FFFFFF",
	    highlight: "#FF5A5E",
	}]; 

	//Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#myChart").get(0).getContext("2d");
	//This will get the first returned node in the jQuery collection.
	var myNewChart = new Chart(ctx);

	// http://dima117.github.io/Chart.Scatter/
	new Chart(ctx).Pie(data);
}

*/