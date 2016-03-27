var Schemas = {};

Schemas.Comments = new SimpleSchema({
  ownerId: {
    type: String,
    label: 'Owner ID',
  },

  content: {
    type: String,
    label: 'Content'
  },

  createdAt: {
    type: String,
    label: 'Creation Date'
  }


});

Comments.attachSchema(Schemas.Comments);
