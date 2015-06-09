Template.settingsActive.helpers({
	'activity': function () {
		return ActivityList.find({}, {sort: {name: 1}}); // sort: sorts list according to value of 'score,' in this case in descending order (specified by -1) - returned list is sorted. 
	  	// sorting: first by number, descending; then, (if tied), by name, ascending 
	},

	'isActivitySelected': function() {
		var selectedActivity = Session.get('selectedActivity'); 
	    var activityId = this._id; 

	    // should be == instead?
	    if (selectedActivity === activityId) {
	      return 'activity-selected'; 
	    }
	}
}); 

Template.settingsActive.events({

	'click li.activity': function(event, template) {
		var activityId = this._id; 
		Session.set('selectedActivity', activityId); 
	},

	'click #submitActivity': function() { 
		var activityName = $('#activityNameTextbox').val(); 

		Meteor.call('insertNewActivity', activityName); 
		console.log(activityName); 
	},

	'click #btn-ok': function() { 
		// finalize activity selection before moving on 
		Session.set('activityIntended', Session.get('selectedActivity'));
		console.log("Activity set to "+Session.get('activityIntended')); 
	}

}); 