//Calls function every 6 hours
Meteor.setInterval(function(){
	Meteor.call("calculateDailyLeaderBoard")
}, 1000*60*60*6)