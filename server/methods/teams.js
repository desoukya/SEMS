// ES6
Meteor.methods({
  createTeam: function(team) {

    var alreadyCreated = Teams.findOne({
      members: Meteor.userId()
    });

    if (alreadyCreated) {
      throw new Meteor.Error(409, "Team was already created by this user");
    } else {
      return Teams.insert(team);
    }
  },

  getTeamMembers: function(teamId) {

    var usersIds = Teams.findOne({
      _id: teamId
    }).members;

    return Meteor.users.find({
      _id: {
        $in: usersIds
      }
    });

  },

  removeFromAllTeams: function(id) {
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

  addMemberToTeam: function(userId, teamId) {
    var team = Teams.findOne({ _id: teamId });

    if (team.members.length >= 8) {
      // FIXME: Which http code here -_-
      throw new Meteor.Error(403, "Team size can't exceed 8 members");
    }

    // Getting the member
    var member = Meteor.users.findOne({
      _id: userId,
      roles: "student",
    });

    if (!!member && !TeamUtils.isInTeam(userId)) {
      Teams.update({ _id: teamId }, { $push: { members: userId } }, function(err, res) {

        Email.send({
          to: member.emails[0].address,
          from: Meteor.settings.systemEmail,
          subject: "[SEMS] You have joined a team !",
          text: `Hello ${member.profile.firstName}, Your scrum master just added you to your team "${team.name}"`
        });

        return team;
      });
    } else {
      throw new Meteor.Error(409, "Can't add this member");
    }


  },


});
