Template.browseTeam.helpers({
  teams: function() {
    return Teams.find();
  },

});
Template.teamCard.helpers({
  image: function() {
    var self = this;
    var imageName = Companies.findOne({
      _id: self.company
    }).image;
    return `/images/teams/${imageName}`;
  },

  membersCount: function() {
    return this.members.length;
  },

  teamId: function() {
    return this._id;
  }
});
