Meteor.methods({
  updateRole(userId, role) {
    // The user who is trying to change another users' role
    var currentUser = Meteor.user();

    if (currentUser) {
      // TODO: Lecturer could be changing roles for TAs
      if (Roles.userIsInRole(currentUser._id, ADMIN)) {
        // Remove and override any previous roles
        Roles.setUserRoles(userId, role);
        return true;
      }

    } else {
      throw new Meteor.Error('Denied: login first');
    }
  },

});
