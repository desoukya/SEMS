// Uses ES6

UserUtils = {
  getRole(userId) {
    var user = Meteor.users.findOne(userId);
    return Roles.getRolesForUser(user)[0];
  },

  isLoggedIn() {
    if (Meteor.user() && Meteor.userId()) {
      return true;
    }
    return false;
  },

  isVerified() {
    let found = _.find(Meteor.user().emails, function(mail) {
      return mail.verified
    });

    if (found)
      return true;
    return false;
  }
}
