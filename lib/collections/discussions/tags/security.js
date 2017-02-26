Tags.allow({

  insert() {
      if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]))
    return true;
  },

  update() {
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    } else
      return false;
  },

  remove(userId, doc) {
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    } else
      return false;
  }

});
