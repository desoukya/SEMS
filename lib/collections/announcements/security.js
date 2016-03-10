Announcements.allow({

  insert() {
    var role = UserUtils.getRole(Meteor.userId());
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);
  },
  update() {
    var role = UserUtils.getRole(Meteor.userId());
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);
  },
  remove() {
    var role = UserUtils.getRole(Meteor.userId());
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);
  }
});
