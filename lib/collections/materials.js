Materials = new FS.Collection("materials", {
  stores: [new FS.Store.FileSystem("materials", {
    path: Paths.materialsPath
  })]
});

Materials.allow({
  'insert': function() {
    // TODO: add custom authentication code here
    return true;
  }
});
// TODO : test that this works
Meteor.users.allow({
  insert: function(){ 
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
