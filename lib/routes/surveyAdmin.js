Router.route('/survey/admin', {
  name: 'survey.admin',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('survey')];
  },

  action() {
    Session.set('title', 'SEMS | Admin');
    this.render('surveyAdmin');
  },

});

Router.route('/survey/admin/:slug/', {
  name: 'admin.teamInfo',
  layoutTemplate: 'teamInfoAdmin',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('fullUsers')];
  },

  action() {
    var team = Teams.findOne({ slug: this.params.slug });

    if (!team)
      this.redirect('survey.admin');


    Session.set('title', `${team.name}`);
  },

  data() {
    return Teams.findOne({ slug: this.params.slug });
  },

});

