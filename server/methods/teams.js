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


});
