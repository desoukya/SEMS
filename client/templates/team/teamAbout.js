// ES6
Template.teamAbout.helpers({
  teamName: function() {
    return this.name;
  },

  members: function() {
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

  teamImage: function() {
    var self = this;
    var imageName = Companies.findOne({
      _id: self.company
    }).image;
    return `/images/teams/${imageName}`;
  },

  companyName: function() {
    var self = this;
    return Companies.findOne({
      _id: self.company
    }).name;
  }

});

Template.memberDetails.helpers({
  image: function() {
    var self = this;
    var defaultPictureIndex = UserUtils.getDefaultPictureIndex(self._id);
    return Images.findOne({
      _id: self.profile.image
    }) || {
      url: `/images/default_${defaultPictureIndex}.png`
    };
  },

  fullName: function() {
    return this.profile.firstName + " " + this.profile.lastName;
  },

  tutorialGroup: function() {
    return this.profile.tutorialGroup;
  }



});
