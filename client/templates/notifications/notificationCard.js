Template.notificationCard.events({
  'click #notification-card': function(event) {
    Notifications.read(this._id);
  },

});
