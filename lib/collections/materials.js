Materials = new Mongo.Collection("materials");

var Schemas = {};

Schemas.Material = new SimpleSchema({
  identifier: {
    type: String,
    label: "identifier",
    max: 200
  },
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  type: {
    type: String,
    label: "material type",
    allowedValues: ['link', 'file'],
  },
  content: {
    type: String,
    label: "material content",
    allowedValues: ['lecture', 'tutorial', 'practiceAssignment'],
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

