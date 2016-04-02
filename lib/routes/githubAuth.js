Router.route('/github/authenticate', {
  name: 'github.authenticate',

  waitOn() {
    Meteor.subscribe('gitAuth');
  },

  action() {
    Session.set('title', 'SEMS | Admin');
    this.render('githubAuth');
  },

});
