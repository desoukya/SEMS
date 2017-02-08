// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({ members: Meteor.userId() });

    if (alreadyCreated)
      throw new Meteor.Error(409, 'Team was already created by this user');
    else if (!Roles.userIsInRole(Meteor.userId(), SCRUM))
      throw new Meteor.Error(401, "Not authorized to create a new team");
    else {
      team.metrics = [{ totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, currentWeek: 0, createdAt: Date.now() }];
      return Teams.insert(team);
    }

  },

  getTeamMembers(teamId) {

    var usersIds = Teams.findOne({ _id: teamId }).members;

    return Meteor.users.find({
      _id: {
        $in: usersIds
      }
    });
  },

  removeFromTeam(userId, teamId) {
    // Should be an admin,lecturer or a TA or a scrum of this team
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]) ||
      (Roles.userIsInRole(Meteor.userId(), SCRUM) &&
        TeamUtils.isMember(Meteor.userId(), teamId))) {

      // Actually removes him if he is in multiple teams too
      Teams.update({
        '_id': {
          $in: (Teams.find({
            members: userId
          }).fetch().map(function(item) {
            return item._id;
          }))
        }
      }, { $pull: { members: userId } }, { multi: true });

    }

  },

  addMemberToTeam(userId, teamId) {
    if (Roles.userIsInRole(Meteor.userId(), SCRUM) && TeamUtils.isMember(Meteor.userId(), teamId) ||
      (Roles.userIsInRole(Meteor.userId(), ADMIN))) {
      // If he is the scrum of this team or an admin he can add members
      var team = Teams.findOne({ _id: teamId });

      if (team.members.length >= 10) {
        // FIXME: Which http code here -_-
        throw new Meteor.Error(403, 'Team size can\'t exceed 10 members');
      }

      // Getting the member
      var member = Meteor.users.findOne({
        _id: userId,
        roles: 'student',
      });

      if (!!member && !TeamUtils.isInTeam(userId)) {
        Teams.update({ _id: teamId }, { $push: { members: userId } }, function(err, res) {

          Email.send({
            to: member.email(),
            from: Meteor.settings.systemEmail,
            subject: '[SEMS] You have joined a team !',
            text: `Hello ${member.profile.firstName}, Your scrum master just added you to your team "${team.name}"`
          });

          return team;
        });
      } else {
        throw new Meteor.Error(409, 'Can\'t add this member');
      }
    } else
      throw new Meteor.Error(401, "You are not authorized to add members to this team");

  },

  calculateDailyLeaderBoard() {

    Teams.find({}, { fields: { repo: 1, metrics: 1, members: 1 } }).forEach(function(team) {
      if (!team.metrics) {
        Teams.update(team, { $push: { metrics: { totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, createdAt: Date.now(), currentWeek: "" } } },
          function(err, affected) {
            if (err) {
              console.log("error while updating".red, err)
            }
          });
      } else if (GitAuth.find({}).count() > 0) {
        metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret, GitAuth.find({}).fetch()[0].accessToken);


        metrics.weeklyCodeFrequency(team.repo, function(err, res) {
          if (!err && res.data) {
            var weeklyData = res.data;
            var weeklyLength = res.data.length;
            if (weeklyLength > 0) {

              var lastInWeeklyData = weeklyData[weeklyLength - 1];
              var additionsAndSubt = (lastInWeeklyData[1]) + (-1 * lastInWeeklyData[2]);
              var latestWeek = lastInWeeklyData[0];

              var teamMetrics = team.metrics;
              var teamMetricsLength = team.metrics.length;
              var lastTeamMetric = teamMetrics[teamMetricsLength - 1];

              if (lastTeamMetric.currentWeek != latestWeek) {
                var lineDiff = additionsAndSubt;
              } else {
                var lineDiff = additionsAndSubt - lastTeamMetric.totalWeeklyLines;
              }

              if (team.members.length < 1) {
                console.log("No members in team ".yellow + team.name);
              } else {

                metrics.contributorsStatistics(team.repo, function(err, res) {
                  if (!err) {
                    var contribStats = res.data;

                    var teamMembers = [];
                    for (var i = 0; i < team.members.length; i++) {
                      var member = Meteor.users.findOne({ _id: team.members[i] }, { fields: { metrics: 1, profile: 1 } });
                      teamMembers.push(member);
                    }

                    metrics.allCommits(team.repo, function(err, res) {
                      if (!err) {
                        var nodeCommits = res.data;
                        metrics.allCommits(team.repo, function(err1, res2) {
                          if (!err1) {
                            var bowerCommits = res2.data;
                            var flaggedCommits = nodeCommits.concat(bowerCommits);
                            _.each(flaggedCommits, function(fcommit, index, list) {

                              metrics.oneCommit(team.repo, function(err2, commitData) {
                                if (!err2) {
                                  var commitUser = commitData.data.author.login;
                                  var files = commitData.data.files;
                                  var flaggedFiles = _.filter(files, function(file) {
                                    return ((file.filename).indexOf("node_modules") > -1 || (file.filename).indexOf("bower_components") > -1)
                                  });
                                  _.each(flaggedFiles, function(file, index, list) {
                                    lineDiff = lineDiff - file.changes;

                                  })
                                }
                              }, fcommit.sha)

                            });
                          }
                        }, "bower_components")
                      }
                    }, "node_modules")

                    var numberOfMembers = teamMembers.length
                    var average = lineDiff / numberOfMembers;
                    var cumulative = 0;

                    _.each(teamMembers, function(member, index, list) {
                      var userTotalWeeklyLines = 0;
                      var userLineAdditions = 0;
                      var found = false;

                      _.each(contribStats, function(stat, i, l) {
                        if (member.profile.githubUser == stat.author.login) {
                          found = true;
                          var lastStatWeek = stat.weeks[stat.weeks.length - 1];
                          userTotalWeeklyLines = lastStatWeek.a + lastStatWeek.c;

                          var lastMemberMetric = member.metrics[member.metrics.length - 1];

                          if (!member.metrics || lastMemberMetric.currentWeek != latestWeek) {
                            userLineAdditions = userTotalWeeklyLines;
                          } else {
                            userLineAdditions = userTotalWeeklyLines - lastMemberMetric.totalWeeklyLines
                          }
                        }
                      });

                      if (!found) {
                        console.log(member.profile.githubUser + ' User did not make any commits or was not found in contributor List'.yellow);
                      }

                      Meteor.users.update(member, {
                        $push: {
                          metrics: {
                            totalWeeklyLines: userTotalWeeklyLines,
                            lineAdditions: userLineAdditions,
                            createdAt: Date.now(),
                            currentWeek: latestWeek
                          }
                        }
                      }, function(err, affected) {
                        if (err) {
                          console.log("error while updating user with new metrics".red, err)
                        }
                      });

                      cumulative = cumulative + Math.pow((average - userLineAdditions), 2);
                    });

                    var variance = cumulative / numberOfMembers;
                    var sd = Math.sqrt(variance);


                    var newPoints = lineDiff - lineDiff * (sd / 1000);
                    var updatedPoints = lastTeamMetric.dailyPoints + newPoints;
                    updatedPoints = updatedPoints | 0;
                    Teams.update(team, {
                      $push: {
                        metrics: {
                          totalWeeklyLines: additionsAndSubt,
                          lineAdditions: lineDiff,
                          standardDev: sd,
                          dailyPoints: updatedPoints,
                          createdAt: Date.now(),
                          currentWeek: latestWeek
                        }
                      }
                    }, function(err, affected) {
                      if (err) {
                        console.log("error while updating team with new metrics".red, err)
                      }
                    });
                  }
                });
              }
            } else {
              console.log("No entries in weekly code frequency for team ".yellow + team.name)
            }
          }
        });
      }
    });

  },

  calculateDailyLeaderBoardUpdated() {

    Teams.find({}, { fields: { repo: 1, metrics: 1, members: 1 } }).forEach(function(team) {
      if (!team.metrics) {
        Teams.update(team, { $push: { metrics: { totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, createdAt: Date.now(), currentWeek: "" } } },
          function(err, affected) {
            if (err) {
              console.log("error while updating".red, err)
            }
          });
      } else if (GitAuth.find({}).count() > 0) {
        metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret, GitAuth.find({}).fetch()[0].accessToken);

        metrics.allCommits(team.repo, function(err, res) {
          if (!err) {
            var commits = res;
            var reducedFlaggedCommits = _.map(commits, function(obj) {
              return obj.sha;
            });

            var userAddedLines = {};

            _.each(reducedFlaggedCommits, function(sha, index, list) {
              var errorExists = false;
              try {
                var commitData = metrics.oneCommit(team.repo, sha);
                if (commitData.data.author != null) {

                  var commitUser = commitData.data.author.login;
                  var files = commitData.data.files;
                  if (!((commitData.data.commit.message).indexOf("Merge") > -1)) {
                    // console.log(commitData.data.commit.message)
                    var flaggedFiles = _.filter(files, function(file) {
                      return (!((file.filename).indexOf("node_modules") > -1) && !((file.filename).indexOf("bower_components") > -1) && !((file.filename).indexOf(".json") > -1));
                    });
                    _.each(flaggedFiles, function(file, index, list) {
                      if (commitUser in userAddedLines) {
                        userAddedLines[commitUser] = userAddedLines[commitUser] + file.changes;
                      } else {
                        userAddedLines[commitUser] = file.changes;
                      }
                    });
                  }
                }
              } catch (e) {
                console.log("error getting commit of " + team.repo + " " + e)
                errorExists = true;
              }

            });
            var lineDiff = _.reduce(userAddedLines, function(memo, value, key, list) {
              return memo + value;
            }, 0);
            if (team.members.length < 1) {
              console.log("No members in team ".yellow + team.name);
            } else {

              var teamMembers = [];
              for (var i = 0; i < team.members.length; i++) {
                var member = Meteor.users.findOne({ _id: team.members[i] }, { fields: { metrics: 1, profile: 1 } });
                teamMembers.push(member);
              }


              var numberOfMembers = teamMembers.length
              var average = lineDiff / numberOfMembers;
              var cumulative = 0;

              _.each(teamMembers, function(member, index, list) {
                var userTotalWeeklyLines = 0;
                var userLineAdditions = 0;


                if (member.profile.githubUser in userAddedLines) {
                  if (member.metrics) {
                    var lastMemberMetric = member.metrics[member.metrics.length - 1];
                    userTotalWeeklyLines = lastMemberMetric.totalWeeklyLines + userAddedLines[member.profile.githubUser];
                  } else {
                    userLineAdditions = userAddedLines[member.profile.githubUser];
                    userTotalWeeklyLines = userLineAdditions;
                  }
                } else {
                  console.log(member.profile.githubUser + ' User did not make any commits or was not found in contributor List'.yellow);
                }

                Meteor.users.update(member, {
                  $push: {
                    metrics: {
                      totalWeeklyLines: userTotalWeeklyLines,
                      lineAdditions: userLineAdditions,
                      createdAt: Date.now()
                    }
                  }
                }, function(err, affected) {
                  if (err) {
                    console.log("error while updating user with new metrics".red, err)
                  }
                });

                cumulative = cumulative + Math.pow((average - userLineAdditions), 2);
              });

              var variance = cumulative / numberOfMembers;
              var sd = Math.sqrt(variance);


              var newPoints = lineDiff - lineDiff * (sd / 10000);

              var teamMetrics = team.metrics;
              var teamMetricsLength = team.metrics.length;
              var lastTeamMetric = teamMetrics[teamMetricsLength - 1];

              var updatedPoints = lastTeamMetric.dailyPoints + newPoints;
              var additionsAndSubt = lastTeamMetric.totalWeeklyLines + lineDiff;
              updatedPoints = updatedPoints | 0;
              Teams.update(team, {
                $push: {
                  metrics: {
                    totalWeeklyLines: additionsAndSubt,
                    lineAdditions: lineDiff,
                    standardDev: sd,
                    dailyPoints: updatedPoints,
                    createdAt: Date.now()
                  }
                }
              }, function(err, affected) {
                if (err) {
                  console.log("error while updating team with new metrics".red, err)
                }
              });

            }
          }
        })

      }
    });

  },

  getGithubAccessToken: function(credentialToken, credentialSecret) {
    // Github.retrieveCredential wraps OAuth.retrieveCredential, which wraps OAuth._retrievePendingCredential
    // From the Meteor docs here: https://github.com/meteor/meteor/blob/devel/packages/oauth/pending_credentials.js#L72
    // When an oauth request is made, Meteor receives oauth credentials
    // in one browser tab, and temporarily persists them while that
    // tab is closed, then retrieves them in the browser tab that
    // initiated the credential request.
    //
    // _pendingCredentials is the storage mechanism used to share the
    // credential between the 2 tabs
    // After retrieval, they are deleted from the db (unless stored in the User Collection by the developer or by an accounts package)
    var credentials = Github.retrieveCredential(credentialToken, credentialSecret);
    console.log('accessToken:', credentials.serviceData.accessToken);

    if (GitAuth.find({}).count() > 0) {
      GitAuth.update({}, { $set: { accessToken: credentials.serviceData.accessToken } }, function(err, affected) {
        if (err) {
          console.log("Error while updating accessToken".red, err);
        } else {
          console.log("updated access Token successfully".green);
        }
      });
    } else {
      GitAuth.insert({ accessToken: credentials.serviceData.accessToken }, function(err, id) {
        if (err) {
          console.log("Error while inserting accessToken".red, err);
        }
      });
    }
  }

});
