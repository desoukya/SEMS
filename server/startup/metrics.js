// Calls function every 6 hours
// Meteor.call("calculateDailyLeaderBoard");
// Meteor.setInterval(function() {
//   Meteor.call("calculateDailyLeaderBoard");
// }, 1000 * 60 * 60 * 6)

// sets up the github client service on your server
ServiceConfiguration.configurations.upsert({ service: "github" }, { $set: { clientId: Meteor.settings.githubId, secret: Meteor.settings.githubSecret } });
