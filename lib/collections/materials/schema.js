var Schemas = {};

Schemas.Material = new SimpleSchema({
  identifier: {
    type: String,
    label: 'identifier',
    max: 200
  },

  title: {
    type: String,
    label: 'Title',
    max: 200
  },

  type: {
    type: String,
    label: 'material type',
    allowedValues: ['link', 'file'],
  },

  content: {
    type: String,
    label: 'material content',
    allowedValues: ['lecture', 'assignment', 'tutorial', 'practiceAssignment', 'code'],
  },

  week: {
    type: Number,
    label: 'currunt week',
    min: 1,
    max: 8,
  },

  description: {
    type: String,
    label: 'Brief description',
    optional: true,
    max: 200
  },

  createdAt: {
    type: String,
    label: 'creation date',
  }

});

Materials.attachSchema(Schemas.Material);
