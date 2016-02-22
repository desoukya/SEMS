Meteor.publish("users", function(id) {
  var user = Meteor.users.findOne(id);
  if (user) {
    // Admins can have full access to users
    if (Roles.userIsInRole(user, ADMIN)) {
      return Meteor.users.find({});
    } else {
      return Meteor.users.find({}, {
        fields: {
          profile: 1
        }
      });
    }
  }
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
