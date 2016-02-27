Template.teamUnavailable.helpers({
  name() {
    return Meteor.user().profile.firstName;
  }
});
