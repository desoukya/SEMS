Meteor.publish("users", function(roles = ROLES) {

  // Checking that roles is an array of strings
  check(roles, [String]);

  var userId = this.userId;
  var user = Meteor.users.findOne(userId);


  var filter = {
    fields: {
      profile: 1,
      emails: 1,
      roles: 1
    }
  };

  var selector = {};

  if (roles) {
    _.each(roles, function(role) {
      if (_.contains(ROLES, role)) {
        filter.fields[role] = 1;
      }
    });
  }

  if (user) {
    // Admins can have full access to users
    if (Roles.userIsInRole(user, ADMIN)) {
      filter = {};
    }

    return Meteor.users.find(selector, filter);

  }
  // If user is not logged in return nothing to fire up ready()
  return [];
});

Meteor.publish("images", function() {
  return Images.find({});
});

Meteor.publish("files", function() {
  return Files.find({});
});

Meteor.publish("materials", function() {
  return Materials.find({});
});

Meteor.publish("teams", function() {
  return Teams.find({});
});
