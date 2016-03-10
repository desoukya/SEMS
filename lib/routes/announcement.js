Router.route('/announcement/create', {
  name: 'announcement.create',

  waitOn() {
    return [Meteor.subscribe('announcements'),Meteor.subscribe('teams'),Meteor.subscribe('companies')];
  },

  action() {
    this.render('createAnnouncement');
  },

});
