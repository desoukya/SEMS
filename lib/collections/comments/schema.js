var Schemas = {};

Schemas.Comments = new SimpleSchema({
  ownerId: {
    type: String,
    label: 'Owner ID',
  },

  content: {
    type: String,
    label: 'Content',
    min: 10,
    max: 700
  },

  createdAt: {
    type: String,
    label: 'Creation Date'
  }


});

Comments.attachSchema(Schemas.Comments);
