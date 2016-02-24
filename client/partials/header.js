Template.header.events({
  "click .logout": function(event) {
    Accounts.logout();
    Router.go('home');
  },

});

Template.header.helpers({
  isActive: function(route) {
    if (checkCurrentRoute(route)) {
      return "active";
    }
    return "";
  },

  userId: function() {
    return Meteor.userId();
  }
});
