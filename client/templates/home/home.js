Template.home.helpers({
  isInTeam() {
    return TeamUtils.isInTeam(Meteor.userId());
  },

  getTeamId() {
    return TeamUtils.getTeam(Meteor.userId())._id;
  }
});

 Meteor.call("calculateDailyLeaderBoard");
