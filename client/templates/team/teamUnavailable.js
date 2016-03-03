Template.teamUnavailable.helpers({
  name: function() {
    return Meteor.user().profile.firstName;
  }
});
