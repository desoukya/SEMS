Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {
    path: Paths.imagesPath
  })]
});

Images.allow({
  'insert': function() {
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