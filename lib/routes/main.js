Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',

  waitOn() {
    Meteor.subscribe('notifications');
  },

});

Router.route('/', {
  name: 'home',

  waitOn() {
    Meteor.subscribe("leaderboardSortedTeams");
  },

  action() {
    if (UserUtils.isLoggedIn() && !TeamUtils.isInTeam(Meteor.userId()) && !Roles.userIsInRole(Meteor.userId(), ADMIN)) {
      // If the user is not in a team make him get into a team !
      this.render('teamUnavailable');
    } else {
      this.render('home');
    }
  },

  data() {
    return Meteor.user();
  }

});

Router.route('/faq', {
  name: 'faq',

  action() {
    Session.set('title', 'FAQ');
    this.render('FAQ');
  },

});

Router.route('/contact', {
  name: 'contact',

  action() {
    Session.set('title', 'SEMS | Contact Us');
    this.render('contactUs');
  },

});
