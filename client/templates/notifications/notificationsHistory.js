Template.notificationsHistory.helpers({
  notifications() {
    return Notifications.find({ ownerId: Meteor.userId() }, {
      sort: {
        createdAt: -1
      }
    });
  },

});

Template.notificationsHistory.events({
  'click #read_notifications_button': function (event, template) {
    Meteor.call('readNotifications');
  }
});
