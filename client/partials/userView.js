Template.userView.onRendered(function() {
  $('.ui.dropdown').dropdown();
})

Template.userView.events({
  'click #logout_button': function(event) {
    Accounts.logout();
    Router.go('home');
  },

  'click #notification-dropdown': function(event) {
    $('.notification.item').removeClass('active');
    $('.notification.item').removeClass('selected');
  },

});

Template.userView.helpers({

  userId() {
    return Meteor.userId();
  },

  username() {
    return Meteor.user().profile.firstName;
  },

  notifications() {
    return Notifications.find({ ownerId: Meteor.userId() }, {
      limit: 5,
      sort: {
        createdAt: -1
      }
    });
  },

  unreadNotificationsCount() {
    return Notifications.find({ ownerId: Meteor.userId(), read: { $ne: true } }, {
      sort: {
        createdAt: -1
      }
    }).count();
  }

});
