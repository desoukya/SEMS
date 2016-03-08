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
    var image = Images.findOne({ '_id': this.profile.image });

    if (image)
      return image;
    else {
      var defaultPictureIndex = UserUtils.getDefaultPictureIndex(this._id);
      return { url: `/images/default_${defaultPictureIndex}.png` };
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

  team() {
    return Teams.findOne({ members: this._id });
  }

});
