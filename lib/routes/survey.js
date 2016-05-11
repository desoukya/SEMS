Router.route('/survey', {
  name: 'user.survey',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
  },

  action() {
    Session.set('title', 'survey');
    this.render('userSurvey');
  },

});
