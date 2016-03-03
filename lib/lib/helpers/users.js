// Uses ES6

UserUtils = {
  getRole: function(userId) {
    var user = Meteor.users.findOne(userId);
    return Roles.getRolesForUser(user)[0];
  },

  isLoggedIn: function() {
    if (Meteor.user() && Meteor.userId()) {
      return true;
    }
    return false;
  },

  isVerified: function() {
    var found = _.find(Meteor.user().emails, function(mail) {
      return mail.verified
    });

    if (found)
      return true;
    return false;
  },

  getDefaultPictureIndex: function(userId) {
    // Getting first 4 characters as a hex value

    var hexValue = toHex(userId.substring(0, 4));

    return parseInt(hexValue) % 6; // we have 5 default photos

  }
}
