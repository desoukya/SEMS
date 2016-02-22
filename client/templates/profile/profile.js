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

});
