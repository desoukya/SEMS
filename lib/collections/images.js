Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {
    path: Paths.imagesPath
  })]
});

Images.allow({
  insert: function(userId, imageObj) {
    return true;
  },
  update: function(userId, imageObj) {
    return true;
  },
  remove: function(userId, imageObj) {
    return true;
  },
  download: function(userId, imageObj) {
    return true;
  }
});
