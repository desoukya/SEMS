// ES6

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
    if (this.emails) {
      return this.emails[0].address;
    } else {
      return this.profile.publicEmail;
    }
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  },

  mobile() {
    return this.profile.mobile;
  },

  githubUser() {
    return this.profile.githubUser;
  },

  displayEmail() {
    return this._id === Meteor.userId() || this.profile.publicEmail;
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
