Meteor.users.helpers({
  fullName() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  },

  email() {
    return this.emails[0].address || this.profile.publicEmail;
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

  havePublicEmail() {
    return this._id === Meteor.userId() || this.profile.publicEmail;
  },

  team() {
    return Teams.findOne({ members: this._id });
  }

});
