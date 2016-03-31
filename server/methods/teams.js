// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({ members: Meteor.userId() });

    if (alreadyCreated)
      throw new Meteor.Error(409, 'Team was already created by this user');
    else if (!Roles.userIsInRole(Meteor.userId(), SCRUM))
      throw new Meteor.Error(401, "Not authorized to create a new team");
    else{
      team.metrics =  [{ totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, createdAt: Date.now() }];
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

      if (team.members.length >= 8) {
        // FIXME: Which http code here -_-
        throw new Meteor.Error(403, 'Team size can\'t exceed 8 members');
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
    metrics = new Metrics(Meteor.settings.githubId, Meteor.settings.githubSecret);
    Teams.find({}, { fields: { repo: 1, metrics: 1, members: 1 } }).forEach(function(team) {
      if (!team.metrics) {
        Teams.update(team, { $push: { metrics: { totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, createdAt: Date.now() } } },
          function(err, affected) {
            if (err) {
              console.log("error while updating".red, err)
            }
          });
      } else {
        var additionsAndSubt = 0;
        metrics.weeklyCodeFrequency(team.repo, function(err, res) {
          if (!err && res.data) {
            if (res.data.length > 0) {
              additionsAndSubt = (res.data[res.data.length - 1][1]) + (-1 * res.data[res.data.length - 1][2]);

              var teamMembers = [];
              if (team.members.length < 1) {
                console.log("No members in team ".yellow + team.name);
              } else {

                var contribStats = [];
                metrics.contributorsStatistics(team.repo, function(err, res) {
                  if (!err) {
                    contribStats = res.data;

                    for (var i = 0; i < team.members.length; i++) {
                      var member = Meteor.users.findOne({ _id: team.members[i] }, { fields: { metrics: 1, profile: 1 } });
                      teamMembers.push(member);
                    }

                    var lineDiff = additionsAndSubt - team.metrics[team.metrics.length - 1].totalWeeklyLines;
                    var average = lineDiff / teamMembers.length;
                    var cumulative = 0;
                    for (var i = 0; i < teamMembers.length; i++) {
                      var userTotalWeeklyLines = 0;
                      var userLineAdditions = 0;
                      var found = false;
                      for (var j = 0; j < contribStats.length; j++) {
                        if (teamMembers[i].profile.githubUser == contribStats[j].author.login) {
                          found = true;

                          userTotalWeeklyLines = contribStats[j].weeks[contribStats[j].weeks.length - 1].a +
                            contribStats[j].weeks[contribStats[j].weeks.length - 1].c;

                          userLineAdditions = userTotalWeeklyLines -
                            teamMembers[i].metrics[teamMembers[i].metrics.length - 1].totalWeeklyLines
                          break;
                        }
                      }
                      if (!found) {
                        console.log(teamMembers[i].profile.githubUser + ' User did not make any commits or was not found in contributor List'.yellow);
                      }

                      Meteor.users.update(teamMembers[i], {
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
                    }

                    var variance = cumulative / teamMembers.length;
                    var sd = Math.sqrt(variance);


                    var newPoints = lineDiff - lineDiff * (sd / 1000);
                    var updatedPoints = team.metrics[team.metrics.length - 1].dailyPoints + newPoints;
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
      return credentials.serviceData.accessToken;
    }






});