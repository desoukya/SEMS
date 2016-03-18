// ES6
Template.header.onRendered(function() {

  Meteor.call('getNodeEnv', function(err, env) {
    if (env === 'development') {
      $('.ui.large.top.hidden.menu').addClass('teal inverted');
    }

  });
  console.log("rendered");

  $('.ui.dropdown').dropdown();

})

Template.header.events({
  'click #logout_button': function(event) {
    Accounts.logout();
    Router.go('home');
  },

  'click #notification-dropdown': function(event) {
    $('.notification.item').removeClass('active');
    $('.notification.item').removeClass('selected');
  },

});

Template.header.helpers({

  userId() {
    return Meteor.userId();
  },

  username() {
    return Meteor.user().profile.firstName;
  },

  notifications() {
    return Notifications.find({ ownerId: Meteor.userId() });
  },

  unreadNotificationsCount() {
    return Notifications.find({ ownerId: Meteor.userId(), read: { $ne: true } }).count();
  }

});
