var Schemas = {};

Schemas.Question = new SimpleSchema({
  title: {
    type: String,
    label: 'title',
    //min: 30
  },

  description: {
    type: String,
    label: 'description',
    optional:true
  },

  ownerId: {
    type: String,
    label: 'asker ID',
  },

  tags: {
    type: [String],
    label: 'tags',
  },

  answers: {
    type: [String],
    label: 'answers ID\'s',
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },

});

Questions.attachSchema(Schemas.Question);
