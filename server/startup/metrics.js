// Calls function every 6 hours
Meteor.call("calculateDailyLeaderBoardUpdated");
// Meteor.setInterval(function() {
//   Meteor.call("calculateDailyLeaderBoard");
// }, 1000 * 60 * 60 * 6)
// metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret, GitAuth.find({}).fetch()[0].accessToken);
// date = new Date();
// var personRegExp = new RegExp("node_modules");
// metrics.allCommits("https://github.com/secourse2016/404notfound", function(err, res) {
//   if (!err) {
//     var count = _.countBy(res, function() {
//       return 'count';
//     });
//     console.log(count);
//   }
// })


// metrics.allCommits("https://github.com/secourse2016/stackoverflow-says-what.git", function(err, res) {
//   if (!err) {
//     var commits = res;
//     var reducedFlaggedCommits = _.map(commits, function(obj) {
//       return obj.sha;
//     });

//     var userAddedLines = {};

//     _.each(reducedFlaggedCommits, function(sha, index, list) {

//       var commitData = metrics.oneCommit("https://github.com/secourse2016/stackoverflow-says-what.git", sha);
//       // console.log(commitData);
//       if (commitData.data.author != null) {
//         var commitUser = commitData.data.author.login;
//         var files = commitData.data.files;
//         if (!((commitData.data.commit.message).indexOf("Merge") > -1)) {
//           // console.log(commitData.data.commit.message)
//           var flaggedFiles = _.filter(files, function(file) {
//             return (!((file.filename).indexOf("node_modules") > -1) && !((file.filename).indexOf("bower_components") > -1) && !((file.filename).indexOf(".json") > -1));
//           });
//           _.each(flaggedFiles, function(file, index, list) {
//             if (commitUser in userAddedLines) {
//               userAddedLines[commitUser] = userAddedLines[commitUser] + file.changes;
//             } else {
//               userAddedLines[commitUser] = file.changes;
//             }
//           });
//         }
//       }

//     });
//     console.log(userAddedLines);
//   }
// })

// metrics.allCommits("https://github.com/secourse2016/404notfound", function(err, res) {
//   if (!err) {
//     var commits = res;
//     var reducedFlaggedCommits = _.map(commits, function(obj) {
//       return obj.sha;
//     });
//     _.each(reducedFlaggedCommits, function(sha, index, list) {

//       metrics.oneCommit("https://github.com/secourse2016/404notfound", function(err2, commitData) {
//         if (!err2) {
//           var commitUser = commitData.data.author.login;
//           var files = commitData.data.files;
//           if (!((commitData.data.commit.message).indexOf("Merge") > -1)) {
//           	// console.log(commitData.data.commit.message)
//             var flaggedFiles = _.filter(files, function(file) {
//               return (!((file.filename).indexOf("node_modules") > -1) && !((file.filename).indexOf("bower_components") > -1) && !((file.filename).indexOf(".json") > -1));
//             });
//             var x = _.map(flaggedFiles, function(obj) {
//               return obj.filename;
//             });
//             x = x.concat(commitUser);
//             // console.log(commitData.data.commit.tree);
//             _.each(flaggedFiles, function(file, index, list) {
//               if (commitUser in userWorthlessLines) {
//                 userWorthlessLines[commitUser] = userWorthlessLines[commitUser] + file.changes;
//               } else {
//                 userWorthlessLines[commitUser] = file.changes;
//               }
//               console.log(userWorthlessLines);

//             });
//           }
//         }
//       }, sha);

//     });
//   }
// })

// console.log("node_modules/sa/asdsad/sadas.js".indexOf("node_modulez") > -1);

// metrics.oneCommit("https://github.com/secourse2016/404notfound", function(err,res){
// if(!err){
// 	console.log(res.data)
// }
// }, "2f28b661e6a84f328d8939205cbcf7dd43e0ad88")

// var getNextPage = function(link, callback) {

//   var splitArray = link.split(",");

//   _.each(splitArray, function(str, index, list) {
//     if ((str).indexOf('"next"') > -1) {
//       var i = str.indexOf('&page=');
//       var pageNo = parseInt(str.charAt(i + 6));
//       callback(pageNo);
//     } else if (index === list.length - 1) {
//       callback(null);
//     }
//   });
// };

// sets up the github client service on your server
ServiceConfiguration.configurations.upsert({ service: "github" }, { $set: { clientId: Meteor.settings.githubId, secret: Meteor.settings.githubSecret } });
