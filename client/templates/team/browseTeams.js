Template.browseTeam.helpers({
  teams() {
    return Teams.find();
  },

});
Template.teamCard.helpers({
  image() {
    var self = this;
    var imageName = Companies.findOne({
      _id: self.company
    }).image;
    return `/images/teams/${imageName}`;
  },

  membersCount() {
    return this.members.length;
  },

  teamId() {
    return this._id;
  }
});
