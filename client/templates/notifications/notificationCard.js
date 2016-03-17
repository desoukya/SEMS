Template.notificationCard.events({
  'click #notification-card': function(event) {
    event.preventDefault();
    Notifications.read(this._id);
  },

});
