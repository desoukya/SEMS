Template.profile.onCreated(function() {
  this.subscribe("users", Meteor.userId());
  this.subscribe("images");
});

Template.profile.helpers({
  image: function() {

    var self = this;

    return Images.findOne({
      _id: self.profile.image
    });
  },

  isCurrentUser: function() {
    return Meteor.userId() === this._id;
  },

  email: function() {
    return this.emails[0].address;
  }


});
