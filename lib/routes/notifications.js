Router.route('/notifications', {
  name: 'notifications.history',

  action() {
    Session.set('title', 'Notifications');
    this.render('notificationsHistory');
  },

  data() {
    return Notifications.find({ ownerId: Meteor.userId() });
  },

});
