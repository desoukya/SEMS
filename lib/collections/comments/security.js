Comments.allow({
  insert(userId, doc) {
    return true;
  },

  update(userId, doc) {
    return doc.ownerId === Meteor.userId();
  },

  remove(userId, doc) {
    return doc.ownerId === Meteor.userId();
  }
});
