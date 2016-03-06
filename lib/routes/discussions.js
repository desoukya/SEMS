Router.route('/discussions', {
  name: 'discussions',

  waitOn() {
    return Meteor.subscribe('questions');
  },

  action() {
    this.render('discussions');
  },

});
