/* Because this JS is located in /lib, it will be executed before other JS (e.g. defining template helpers). */ 

// navigate to new page from modal - workaround using a timeout
switchPageWait = function (page) {
	// page is string - name of destination template
	Meteor.setTimeout(function() {Router.go(page);  }, 200); 
	console.log('navigating to '+page+' in 200 milliseconds'); 
}

