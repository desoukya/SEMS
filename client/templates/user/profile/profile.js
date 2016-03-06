Template.profile.helpers({
  image() {
    var self = this;
    var defaultPictureIndex = UserUtils.getDefaultPictureIndex(self._id);
    return Images.findOne({
      _id: self.profile.image
    }) || {
      url: `/images/default_${defaultPictureIndex}.png`
    };

  },

  isCurrentUser() {
    return Meteor.userId() === this._id;
  },

  email() {
    if (this.emails)
      return this.email();
    else
      return this.profile.publicEmail;

  },

  teamId() {
    var team = TeamUtils.getTeam(this._id);

    if (team) {
      return team._id;
    }
  },

  teamName() {
    var team = TeamUtils.getTeam(this._id);

    if (team) {
      return team.name;
    }
  }

});
