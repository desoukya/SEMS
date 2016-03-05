Images = new FS.Collection('images', {
  stores: [new FS.Store.FileSystem('images', {
    path: '~/public/.uploads/.images'
  })],
});

Images.filters({
  maxSize: 5242880, // 5 MB in bytes
  allow: {
    contentTypes: ['image/*'],
    extensions: ['png', 'jpg', 'jpeg']
  },

  onInvalid(message) {
    if (Meteor.isClient) {
      sAlert.error(message);
    }
  },

});

Images.allow({
  insert(userId, imageObj) {
    return true;
  },
  update(userId, imageObj) {
    return true;
  },
  remove(userId, imageObj) {
    return true;
  },
  download(userId, imageObj) {
    return true;
  }
});
