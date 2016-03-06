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

  tutorialGroup() {
    return this.profile.tutorialGroup;
  },

});
