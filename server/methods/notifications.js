Meteor.methods({
  readAllNotifications() {
    Notifications.update({ ownerId: Meteor.userId(), read: false }, { $set: { read: true } }, { multi: true });
  },

  deleteAllNotifications() {
    Notifications.remove({ ownerId: Meteor.userId() });
  },

});
