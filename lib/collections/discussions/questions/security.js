Questions.allow({

  insert() {
    return true;
  },

  update() {
    if (userId === doc.ownerId || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    } else
      return false;
  },

  remove(userId, doc) {
    if (userId === doc.ownerId || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    } else
      return false;
  }

});
