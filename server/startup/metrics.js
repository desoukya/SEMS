//Calls function every 6 hours
// Meteor.call("calculateDailyLeaderBoard");
// Meteor.setInterval(function() {
//   Meteor.call("calculateDailyLeaderBoard");
// }, 1000 * 60 * 60 * 6)
metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret);
metrics.contributorsStatistics("https://github.com/secourse2016/404notfound.git", function(err, res) {
	if(!err){
		console.log(res.data);
	}
	});
 // sets up the github client service on your server
    ServiceConfiguration.configurations.upsert(
      { service: "github" },
      { $set: { clientId: Meteor.settings.githubId, secret: Meteor.settings.githubSecret } }
    );
