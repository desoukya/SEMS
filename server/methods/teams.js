// ES6
Meteor.methods({
  createTeam(team) {

    var alreadyCreated = Teams.findOne({
      members: Meteor.userId()
    });

    if (alreadyCreated) {
      throw new Meteor.Error(409, "Team was already created by this user");
    } else {
      Teams.insert(team, function(err, data) {
        if (err)
          throw err;
      });
    }



  },


});
