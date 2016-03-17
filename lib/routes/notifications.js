Router.route('/notifications', {
  name: 'notifications.history',

  action() {
    this.render('notificationsHistory');
  },

  data() {
    return Notifications.find({ ownerId: Meteor.userId() });
  },

});
