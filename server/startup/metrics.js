// Calls function every 6 hours
// Meteor.call("calculateDailyLeaderBoard");
// Meteor.setInterval(function() {
//   Meteor.call("calculateDailyLeaderBoard");
// }, 1000 * 60 * 60 * 6)

metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret, GitAuth.find({}).fetch()[0].accessToken);
date = new Date();
metrics.allCommits("https://github.com/secourse2016/hackstreet-boys", function(err,res){
if(!err){
	console.log(res.data)
}
}, "node_modules", date.toISOString())

// metrics.oneCommit("https://github.com/secourse2016/404notfound", function(err,res){
// if(!err){
// 	console.log(res.data)
// }
// }, "2f28b661e6a84f328d8939205cbcf7dd43e0ad88")

// sets up the github client service on your server
ServiceConfiguration.configurations.upsert({ service: "github" }, { $set: { clientId: Meteor.settings.githubId, secret: Meteor.settings.githubSecret } });
