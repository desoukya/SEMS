Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {
    path: Paths.filespath
  })]
});

Files.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  download: function() {
    return true;
  }
});
