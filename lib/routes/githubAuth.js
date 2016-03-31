Router.route('/github/authenticate', {
  name: 'github.authenticate',

  waitOn() {
    // return [Meteor.subscribe('allAnnouncements'), Meteor.subscribe('teams'), Meteor.subscribe('users')];
  },

  action() {
    this.render('githubAuth');
  },

});