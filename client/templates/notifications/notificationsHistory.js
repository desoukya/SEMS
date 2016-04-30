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
  },

  'click #delete_notifications_button': function (event, template) {
    $('#delete-notifications-modal').modal({
      onApprove() {
        Meteor.call('deleteNotifications', function (err) {
          if (err)
            sAlert.error(err.reason);
        });
      }
    }).modal('show');
  }
});
