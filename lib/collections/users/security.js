Meteor.users.allow({
  insert(userId, user) {
    return true;
  },

  update(userId, user) {

    if (userId === user._id || Roles.userIsInRole(userId, ADMIN)) {
      return true;
    }

    return false;
  },

  remove(userId, user) {
    // For now don't allow user removal with normal interactions
    if (Roles.userIsInRole(userId, ADMIN)) {
      return true;
    }
    return false;
  }

});
