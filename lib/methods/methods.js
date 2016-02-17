Meteor.methods({
  updateRole: function(userId, role) {
    // The user who is trying to change another users' role
    var currentUser = Meteor.user();

    if (currentUser) {
      // Admins have thier own view, no need to check
      // Lecturer can change a user roles to Lecturer or TA
      if (Roles.userIsInRole(currentUser._id, LECTURER) &&
        (role == LECTURER || role == TA)) {
        Roles.addUsersToRoles(userId, role);
        return true;
      }

    } else {
      // FIXME: Add a proper error displaying
      throw new Meteor.Error("Denied: login first");
    }
  },

});
