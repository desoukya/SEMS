Router.route('/announcement/create', {
  name: 'announcement.create',

  waitOn() {
    return Meteor.subscribe('announcements');
  },

  action() {
    this.render('createAnnouncements');
  },

});
