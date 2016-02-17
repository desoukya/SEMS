Materials = new Mongo.Collection("materials");

var Schemas = {};

Schemas.Material = new SimpleSchema({
  fileId: {
    type: String,
    label: "file_id",
    max: 20
  },
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
Materials.attachSchema(Schemas.Material);

