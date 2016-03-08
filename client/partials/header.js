// ES6
Template.header.onRendered(function() {
  $('.ui.dropdown').dropdown();

  Meteor.call('getNodeEnv', function(err, env) {
    if (env === 'development') {
      $('.ui.large.top.hidden.menu').addClass('teal inverted');
    }

  });

})

Template.header.events({
  'click #logout_button': function(event) {
    Accounts.logout();
    Router.go('home');
  },

});

Template.header.helpers({
  isActive(route) {
    if (isCurrentRoute(route)) {
      return 'active';
    }
    return '';
  },

  userId() {
    return Meteor.userId();
  },

  username() {
    return Meteor.user().profile.firstName;
  },

});
