getRole = function(userId) {
  var user = Meteor.users.findOne(userId);
  return Roles.getRolesForUser(user)[0];
}
