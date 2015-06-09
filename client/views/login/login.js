Template.login.rendered = function() {
	if (Meteor.userId != null) {
		// a user is logged in - go to home screen
		//Router.go('home'); 
	}
}