//Calls function every 6 hours
Meteor.call("calculateDailyLeaderBoard");
Meteor.setInterval(function() {
  Meteor.call("calculateDailyLeaderBoard");
}, 1000 * 60 * 60 * 6)