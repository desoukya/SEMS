// ES6
Template.header.onRendered(function() {
  $('.ui.dropdown').dropdown();
})

Template.header.events({
  'click #logout_button': function(event) {
    Accounts.logout();
    Router.go('home');
  },

});

Template.header.helpers({
  isActive: function(route) {
    if (checkCurrentRoute(route)) {
      return 'active';
    }
    return '';
  },

  userId: function() {
    return Meteor.userId();
  },

  userName: function() {
    return Meteor.user().profile.firstName;
  },

});
