Template.unverified.events({
  "click #resend-verification-button": function(event, template) {
    Meteor.call("resendVerification", Meteor.userId());
  }
});
