Template.manageUsers.helpers({
  users: function() {
    return Meteor.users.find();
  }
});


Template.userEntry.rendered = function() {
  $('.ui.dropdown')
    .dropdown();

  Meteor.subscribe("users", Meteor.userId());
};

Template.userEntry.helpers({
  username: function() {
    // FIXME: this should be extracted into a method or extended in user object
    var user = Meteor.users.findOne(this._id);
    return user.profile.firstName + " " + user.profile.lastName;
  },

  role: function() {
    // Enforcing one role for user for current setup
    var user = Meteor.users.findOne(this._id);
    return Roles.getRolesForUser(user)[0];
  },

});
