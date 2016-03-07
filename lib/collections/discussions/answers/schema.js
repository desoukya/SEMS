var Schemas = {};

Schemas.Answers = new SimpleSchema({
  body: {
    type: String,
    label: 'body',
    optional: true
  },

  ownerId: {
    type: String,
    label: 'owner ID',
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },

});

Answers.attachSchema(Schemas.Question);
