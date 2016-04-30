Meteor.methods({
  readNotifications() {
    Notifications.update({ ownerId: Meteor.userId(), read: false }, { $set: { read: true } }, { multi: true });
  },

  deleteNotifications() {
    Notifications.remove({ ownerId: Meteor.userId() });
  },

});
