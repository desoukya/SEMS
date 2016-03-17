Template.notificationsHistory.helpers({
  notifications() {
    return Notifications.find({ ownerId: Meteor.userId() });
  },

});
