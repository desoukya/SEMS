Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {
    path: Paths.filespath
  })]
});

Files.filters({
  maxSize: 20971520, // 5 MB in bytes
  onInvalid: function(message) {
    if (Meteor.isClient) {
      sAlert.error(message);
    }
  }
});

Files.allow({
  insert: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);

  },
  update: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);

  },
  remove: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);

  },
  download: function(userId, fileObj) {
    // Anyone currently can download files
    return true;
  }
});
