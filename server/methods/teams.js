// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({ members: Meteor.userId() });

    if (alreadyCreated)
      throw new Meteor.Error(409, 'Team was already created by this user');
    else if (!Roles.userIsInRole(Meteor.userId(), SCRUM))
      throw new Meteor.Error(401, "Not authorized to create a new team");
    else
      return Teams.insert(team);

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


});
