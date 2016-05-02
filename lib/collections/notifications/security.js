// Everything is done through methods for now
Notifications.allow({
  insert(userId, doc) {
    return false;
  },

  update(userId, doc) {
    return Meteor.userId() === doc.ownerId;
  },

  remove(userId, doc) {
    return Meteor.userId() === doc.ownerId;
  }
});
