Template.notification.events({
  
  'click .notification.item': function(event, template) {
    Notifications.read(this._id);
  },

});
