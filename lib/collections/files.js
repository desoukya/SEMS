Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {
    path: Paths.filespath
  })]
});



Files.allow({
  insert: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);

    return false;

  },
  update: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);


    return false;
  },
  remove: function(userId, fileObj) {
    // Files are added for materials only now, so only lecturers and TAs can modify
    var role = UserUtils.getRole(userId);
    check(role, String);
    var acceptedRoles = [ADMIN, LECTURER, TA];

    return _.contains(acceptedRoles, role);


    return false;
  },
  download: function(userId, fileObj) {
    // Anyone currently can download files
    return true;
  }
});
