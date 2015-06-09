/* Because this JS is located in /lib, it will be executed before other JS (e.g. defining template helpers). */ 

// navigate to new page from modal - workaround using a timeout
switchPageWait = function (page) {
	// page is string - name of destination template
	Meteor.setTimeout(function() {Router.go(page);  }, 400); 
	console.log('navigating to '+page+' in 400 milliseconds'); // could go as low as 200, but if site lags and takes longer to transition, page breaks.  
}

// universal template methods - e.g. for accessing session variables
UI.registerHelper('session', function(input) {
    return Session.get(input);
});

// use for this: {{session "currentSession"}} --> return Session.get('currentSession')
// http://stackoverflow.com/questions/13060608/can-meteor-templates-access-session-variables-directly
// https://www.discovermeteor.com/blog/spacebars-secrets-exploring-meteor-new-templating-engine/


calculateTimeDiff = function (nowDate, laterDate) { // returns value in milliseconds
	var now  = nowDate.getTime();
	var later = laterDate.getTime();

	var ms = moment(later).diff(moment(now)); // difference in milliseconds 
	//var d = moment.duration(ms);
	
	// <!-- Use the below for formatting. --> 
	//var s = moment.utc(ms).format("mm:ss");
	//Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

	// outputs: "mm:ss"

	//if (s.charAt(1) === '0')

	return ms; 
}
// uses moment.js
// http://stackoverflow.com/questions/15993913/format-date-with-moment-js 