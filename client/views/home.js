/* JS for home view */ 

Template.modalActivePassiveCheck.events({

	'click #settingsActive': function() {
		$('#modal-active-passive-check').modal('hide');
		Router.go('settingsActive'); 
	},

	'click #settingsGeneral': function() {
		$('#modal-active-passive-check').modal('hide');
		Router.go('settingsGeneral'); 
	}

	// href attribute was being finnicky with show/hide modal - weird workaround 
});