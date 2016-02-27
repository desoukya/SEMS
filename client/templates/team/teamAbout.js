// ES6
Template.teamAbout.helpers({
  teamName() {
    return this.name;
  },

  members() {
    // TODO: Refactor to a methods !
    var usersIds = Teams.findOne({
      _id: this._id
    }).members;

    return Meteor.users.find({
      _id: {
        $in: usersIds
      }
    });
  },

  teamImage() {
    return TeamUtils.getDefaultPhoto(this._id);
  }

});

Template.memberDetails.helpers({
  image() {
    var self = this;
    var defaultPictureIndex = UserUtils.getDefaultPictureIndex(self._id);
    return Images.findOne({
      _id: self.profile.image
    }) || {
      url: `/images/default_${defaultPictureIndex}.png`
    };
  },

  fullName() {
    return this.profile.firstName + " " + this.profile.lastName;
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  }



});
