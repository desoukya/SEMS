Template.browseTeam.helpers({
  teams() {
    return Teams.find();
  },

});

Template.teamCard.helpers({
  membersCount() {
    return this.members.length;
  },

});
