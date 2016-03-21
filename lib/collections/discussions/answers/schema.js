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

  upvotes: {
    type: [Object],
    label: 'upvotes'
  },

  downvotes: {
    type: [Object],
    label: 'upvotes'
  },

  bestAnswer: {
    type: Boolean,
    optional: true,
    label: 'Best Answer'
  },

  createdAt: {
    type: String,
    label: 'Creation Date',
  },

});

Answers.attachSchema(Schemas.Answers);
