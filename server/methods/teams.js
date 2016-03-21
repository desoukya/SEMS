// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({ members: Meteor.userId() });

    if (alreadyCreated) {
      throw new Meteor.Error(409, 'Team was already created by this user');
    } else {
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

  removeFromAllTeams(id) {
    Teams.update({
      '_id': {
        $in: (Teams.find({
          members: id
        }).fetch().map(function(item) {
          return item._id;
        }))
      }
    }, {
      $pull: {
        members: id
      }
    }, {
      multi: true
    });

  },

  addMemberToTeam(userId, teamId) {
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

  },

  calculateDailyLeaderBoard() {
    metrics = new Metrics();
    Teams.find({}, { fields: { repo: 1, metrics: 1, members: 1 } }).forEach(function(team) {
      if (!team.metrics) {
        Teams.update(team, { $push: { metrics: { totalWeeklyLines: 0, lineAdditions: 0, standardDev: 0, dailyPoints: 0, createdAt: Date.now() } } },
          function(err, affected) {
            if (err) {
              console.log("error while updating".red, err)
            } else {
              console.log(affected + " documents affected")
            }
          });
      } else {
        var additionsAndSubt = 0;
        metrics.weeklyCodeFrequency(team.repo, function(err, res) {
          if (!err) {
            if (res.data.length > 0) {
              additionsAndSubt = (res.data[res.data.length - 1][1]) + (-1 * res.data[res.data.length - 1][2]);
            } else {
              console.log("No entries in weekly code frequency".yellow)
            }
          }
        });


        var teamMembers = [];
        if (team.members.length < 1) {
          console.log("This team has no members".red)
        } else {
          for (var i = 0; i < team.members.length; i++) {
            var member = Meteor.users.findOne({ _id: team.members[i] }, { fields: { metrics: 1, profile: 1 } });
            teamMembers.push(member);
          }

          var contribStats = [];
          metrics.contributorsStatistics(team.repo, function(err, res) {
            if (!err) {
              contribStats = res.data;
              console.log("hena".green + res.data);
            }
          });

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
              console.log('User did not make any commits or was not found in contributor List'.yellow);
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
              } else {
                console.log(affected + " users affected")
              }
            });

            cumulative = cumulative + Math.pow((average - userLineAdditions), 2);
          }

          var variance = cumulative / teamMembers.length;
          var sd = Math.sqrt(variance);


          var newPoints = lineDiff - lineDiff * (sd / 1000);
          var updatedPoints = team.metrics[team.metrics.length - 1].dailyPoints + newPoints;
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
            } else {
              console.log(affected + " teams affected")
            }
          });
        }
      }
    });

    var pointInc = 0;
    var sortedTeams = Teams.aggregate([
      { $unwind: "$metrics" },
      { $group: { _id: "$_id", metrics: { $last: "$metrics" } } },
      { $sort: { "metrics.dailyPoints": 1 } }
    ]);
    for (var i = 0; i < sortedTeams.length; i++) {
      var team = sortedTeams[sortedTeams.length - 1];
      // Teams.update({ _id: team._id }, { $inc: { dailyPoints: pointInc } },
      //   function(err, affected) {
      //     if (err) {
      //       console.log("error while incrementing points in standardDev".red, err)
      //     } else {
      //       console.log(affected + " documents affected")
      //     }
      //   });
      console.log(pointInc, +" " + team);
      pointInc++;
    }

  }




});
