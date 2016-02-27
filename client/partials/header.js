// ES6
Template.header.onRendered(function() {
  $('.ui.dropdown').dropdown();
})

Template.header.events({
  "click #logout_button": function(event) {
    Accounts.logout();
    Router.go('home');
  },

});

Template.header.helpers({
  isActive(route) {
    if (checkCurrentRoute(route)) {
      return "active";
    }
    return "";
  },

  userId() {
    return Meteor.userId();
  },

  teamId() {
    var team = Teams.findOne({
      members: Meteor.userId()
    });

    if (team) {
      return team._id;
    } else {
      return "";
    }

  },

  userName() {
    return Meteor.user().profile.firstName;
  },
});
