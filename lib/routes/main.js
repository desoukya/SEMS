Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',

  waitOn() {
    Meteor.subscribe("teams");
  },

  action() {
    if (UserUtils.isLoggedIn() && !TeamUtils.isInTeam(Meteor.userId())) {
      // If the user is not in a team make him get into a team !
      this.render("teamUnavailable");
    } else {
      this.render("home");
    }
  },

});
