Meteor.users.helpers({
  fullName() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  },

  githubUser() {
    return this.profile.githubUser;
  },

  email() {
    return this.emails[0].address;
  },

  profilePicture() {
    var image = Images.findOne({ '_id': Meteor.user().profile.image });

    if (image)
      return image.url;
    else {
      var defaultPictureIndex = UserUtils.getDefaultPictureIndex(Meteor.userId());
      return `/images/default_${defaultPictureIndex}.png`;
    }

  },

  publicEmail() {
    return this.profile.publicEmail;
  },

  mobile() {
    return this.profile.mobile;
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  },

  havePublicEmail() {
    return this._id === Meteor.userId() || this.profile.publicEmail;
  },

});
