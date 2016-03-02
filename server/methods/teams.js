// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({
      members: Meteor.userId()
    });

    if (alreadyCreated) {
      throw new Meteor.Error(409, "Team was already created by this user");
    } else {
      return Teams.insert(team);
    }
  },

  getTeamMembers(teamId) {

    var usersIds = Teams.findOne({
      _id: teamId
    }).members;

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

    if (Teams.findOne({ _id: teamId }).members.length >= 8) {
      // FIXME: Which http code here -_-
      throw new Meteor.Error(403, "Team size can't exceed 8 members");
    }

    // Getting the member
    var member = Meteor.users.findOne({
      _id: userId,
      roles: "student",
    });

    if (!!member && !TeamUtils.isInTeam(userId)) {
      return Teams.update({ _id: teamId }, { $push: { members: userId } });
    } else {
      throw new Meteor.Error(409, "Can't add this member");
    }


  },


});
