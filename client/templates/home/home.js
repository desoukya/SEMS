Template.home.helpers({
  isInTeam() {
    return TeamUtils.isInTeam(Meteor.userId());
  },

  getTeamSlug() {
    return TeamUtils.getTeam(Meteor.userId()).slug;
  }
});

 Meteor.call("calculateDailyLeaderBoard");
