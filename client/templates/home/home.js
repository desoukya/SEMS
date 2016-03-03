Template.home.helpers({
  isInTeam: function() {
    return TeamUtils.isInTeam(Meteor.userId());
  },

  getTeamId: function() {
    return TeamUtils.getTeam(Meteor.userId())._id;
  }
});
