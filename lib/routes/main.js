Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: "pageNotFound"
});

Router.route('/', {
  name: 'home',

  waitOn: function() {
    Meteor.subscribe("teams");
  },

  action: function() {
    if (UserUtils.isLoggedIn() && !TeamUtils.isInTeam(Meteor.userId())) {
      // If the user is not in a team make him get into a team !
      this.render("teamUnavailable");
    } else {
      this.render("home");
    }
  },

});

Router.route('/faq', {
  name: 'faq',

  action: function() {
    this.render("FAQ");
  },

});

Router.route('/contact', {
  name: 'contact',

  action: function() {
    this.render("contactUs");
  },

});
