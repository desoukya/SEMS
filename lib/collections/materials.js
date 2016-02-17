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

var Schemas = {};

Schemas.MaterialFile = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  type: {
    type: String,
    label: "material type",
    allowedValues: ['article', 'sentence', 'exercise', 'lesson', 'word'],
  },
  week: {
    type: String,
    label: "currunt week",
    min: 0,
    allowedValues: ['week1', 'week2', 'week3', 'week4'],
  },
  description: {
    type: String,
    label: "Brief description",
    optional: true,
    max: 200
  }
});
Schemas.Material = new SimpleSchema({
  metadata: {
    type: Schemas.MaterialFile
  }
});
//Materials.attachSchema(Schemas.Material);