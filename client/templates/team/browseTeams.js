Template.browseTeam.helpers({
  teams() {
    return Teams.find();
  },

});
Template.teamCard.helpers({
  image() {
    return TeamUtils.getDefaultPhoto(this._id);
  },

  membersCount() {
    return this.members.length;
  },

  teamId() {
    return this._id;
  }
});
