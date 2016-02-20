Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {
    path: Paths.filespath
  })]
});

Files.allow({
  'insert': function() {
    // TODO: add custom authentication code here
    return true;
  },
  'download': function() {
    // TODO: add custom authentication code here
    return true;
  }
});

Meteor.users.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});