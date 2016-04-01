Router.route('/github/authenticate', {
  name: 'github.authenticate',

  waitOn() {
    Meteor.subscribe('gitAuth');
  },

  action() {
    this.render('githubAuth');
  },

});