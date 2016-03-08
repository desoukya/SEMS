Template.browseTeam.helpers({
  teams() {
    return Teams.find({}, {sort: {createdAt: 1}});
  },

});

Template.teamCard.helpers({
  membersCount() {
    return this.members.length;
  },

});
