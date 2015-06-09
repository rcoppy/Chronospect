Template.sessionList.rendered = function() { 
	setCSSBodyOffset(); 
};

Template.sessionList.helpers({
	'session': function () {
		return SessionList.find({}, {sort: {timeStart: -1}}); // sort: sorts list according to value of 'score,' in this case in descending order (specified by -1) - returned list is sorted. 
	  	// sorting: first by number, descending; then, (if tied), by name, ascending 
	},

	'isSessionSelected': function() {
		var selectedSession = Session.get('selectedSession'); 
	    var sessionId = this._id; 

	    // should be == instead?
	    if (selectedSession === sessionId) {
	      return 'session-selected'; 
	    }
	}
}); 

Template.sessionList.events({

	'click li.session': function(event, template) {
		var sessionId = this._id; 
		Session.set('selectedSession', sessionId); // the selectedSession is global, so it carries over to the summary view
		Router.go('sessionSummary'); 
	}

}); 