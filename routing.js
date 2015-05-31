/* Set up routing between views. */ 

Router.map(function() {
	this.route('login', {path: '/'});

	this.route('home'); 
	this.route('sessionList'); 
	this.route('sessionSummary'); 
	this.route('settingsActive'); 
	this.route('settingsGeneral'); 
	this.route('timer');  

	this.route('loading', {path: '/login'}); // loading page will redirect to login page

}); 