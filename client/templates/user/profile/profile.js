// ES6

Template.profile.onCreated(function() {
  this.subscribe("users", Meteor.userId());
  this.subscribe("images");
});

Template.profile.helpers({
  image() {

    var self = this;

    var randIndex = Math.floor((Math.random() * 5) + 1);

    // FIXME: Seed the images into fs collections or assign the url to the user
    return Images.findOne({
      _id: self.profile.image
    }) || {
      url: `/images/default_${randIndex}.png`
    };
  },

  isCurrentUser() {
    return Meteor.userId() === this._id;
  },

  email() {
    return this.emails[0].address;
  }

});
