Questions.allow({

  insert() {
    return true;
  },

  update() {
    return true;
  },

  remove(userId, doc) {
    if (userId === doc.ownerId || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    } else
      return false;
  }

});
