// ES6

Template.profile.onCreated(function() {
  this.subscribe("users", Meteor.userId());
  this.subscribe("images");
});

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
    return this.emails[0].address;
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  },

  mobile() {
    return this.profile.mobile;
  },

  githubUser() {
    return this.profile.githubUser;
  }

});
