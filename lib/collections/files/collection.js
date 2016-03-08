Files = new FS.Collection('files', {
  stores: [new FS.Store.FileSystem('files', {
    path: '~/public/.uploads/.files'
  })]
});

Files.filters({
  maxSize: 20971520, // 5 MB in bytes
  onInvalid(message) {
    if (Meteor.isClient) {
      sAlert.error(message);
    }
  }
});
