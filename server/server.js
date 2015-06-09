/* 

  Two crucial things to remember about meteor application security: 
    - meteor remove autopublish 
        restricts access of user only to data they're intended to see 
    - meteor remove insecure
        command prompt can't be used to modify databases

*/

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish('sessions', function(){
  var currentUserId = this.userId;
  return SessionList.find({createdBy: currentUserId})
});

Meteor.publish('entries', function(){
  var currentUserId = this.userId;
  return EntryList.find({createdBy: currentUserId})
});

Meteor.publish('activities', function(){
  var currentUserId = this.userId;
  return ActivityList.find({createdBy: currentUserId})
});

Meteor.publish('timeIntervals', function(){
  return TimeIntervalList.find(); 
});

// Methods for accessing server functionality 
Meteor.methods({
  // methods go here 
  'insertNewActivity': function(activity) { 
    var currentUserId = Meteor.userId(); 
    if (ActivityList.find({name: activity}).count() < 1) { // check for redundancy 
      ActivityList.insert({
        createdBy: currentUserId,
        name: activity
      });
      console.log("Added activity "+activity); 
    } 
  }, 

  'insertNewInterval': function(time) { 
    TimeIntervalList.insert({
        minutes: time
      });
  }, 

  'insertNewSessionRecord': function(timeInterval, sessionName) { 
    
    // uses current timer, user; user-defined name

    var currentUserId = Meteor.userId(); 
   
    SessionList.insert({
      createdBy: currentUserId,
      timeStart: new Date(), // current date/time
      timeEnd: new Date(), // by default, end when begin - should override later (at end of recording) 
      timeInterval: timeInterval, 
      name: sessionName // can be null - optional 
    });

    console.log("Added session " + SessionList.find(SessionList.find().count()-1)); 
     
  }, 

  'insertNewEntry': function(parentId, isActiveObservation, activityIntended, activityActual, engagement, mood) { // parentId is _id of session to which entry belongs  
    
    // uses current timer, user; user-defined name

    var currentUserId = Meteor.userId(); 
   
    EntryList.insert({
      createdBy:            currentUserId,
      parentId:             parentId, // primary key of session to which this entry is child
      time:                 new Date(), // currentTime
      isActiveObservation:  isActiveObservation, // false means passive - not recording intended activity; true means active - we are. 
      activityIntended:     activityIntended, // primary key of activity - NOT its string name. null if isActiveObservation false 
      activityActual:       activityActual, // again, a primary key  
      engagement:           engagement, // scale 1 to 5
      mood:                 mood // 1 is terrible, 5 is great - represent with emoticons?  
    });

    console.log("Added entry " + EntryList.find(EntryList.find().count()-1)); 
    
    return "hi bill, this is joel."; // returns just-added session 

  }, 

  'insertPlayerData': function(playerNameVar) {
    var currentUserId = Meteor.userId(); 
    PlayersList.insert({
      name: playerNameVar,
      score: 0,
      createdBy: currentUserId
    });
  },

  'removePlayerData': function(selectedPlayer) {
    var currentUserId = Meteor.userId();
    PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});   
  },

  'modifyPlayerScore': function(selectedPlayer, amount) {
    
    var currentUserId = Meteor.userId();

    PlayersList.update(
      {_id: selectedPlayer, createdBy: currentUserId}, // user can only modify data if they're the ones who created it  
      {$inc: {score: amount}} // $set operator: lets us change one specific field without affecting the rest of the document. 
      // $inc operator: lets us increase a specific value 
    );
  }

});
