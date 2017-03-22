var Schemas = {};

Schemas.Question = new SimpleSchema({
  title: {
    type: String,
    label: 'title',
  },

  description: {
    type: String,
    label: 'description',
    optional: true
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
    label: 'answers IDs',
  },

  upvotes: {
    type: [Object],
    label: 'upvotes',
    blackbox: true
  },

  viewers: {
    type: [String],
    label: "visitors",
    optional: true
  },

  downvotes: {
    type: [Object],
    label: 'upvotes',
    blackbox: true
  },

  comments: {
    type: [String],
    label: 'Comments IDs',
    optional: true
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },
  closed:{
    type: Boolean,
    defaultValue: false,
    label: 'closed',
  },

});

Questions.attachSchema(Schemas.Question);
