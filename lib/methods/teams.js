// ES6
Meteor.methods({
  createTeam(team) {

    Teams.insert(team, function(err, data) {
      if (err)
        throw err;
    });

  },


});
