Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {
    path: Paths.imagesPath
  })],
});
Images.filters({
  maxSize: 5242880, // 5 MB in bytes
  allow: {
    contentTypes: ['image/*'],
    extensions: ['png','jpg','jpeg']
  },
  onInvalid: function(message) {
    if (Meteor.isClient) {
      sAlert.error(message);
    }
  }
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