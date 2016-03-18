// Everything is done through methods for now
Notifications.allow({
  insert() {
    return false;
  },

  update(userId, doc) {
    return Meteor.userId() === doc.ownerId;
  },

  remove() {
    return false;
  }
});
