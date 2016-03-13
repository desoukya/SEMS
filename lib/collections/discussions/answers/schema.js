var Schemas = {};

Schemas.Answers = new SimpleSchema({
  description: {
    type: String,
    label: 'description',
  },

  ownerId: {
    type: String,
    label: 'Owner ID',
  },

  createdAt: {
    type: String,
    label: 'Creation Date',
  },

});

Answers.attachSchema(Schemas.Answers);
