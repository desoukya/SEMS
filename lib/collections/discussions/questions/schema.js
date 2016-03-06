var Schemas = {};

Schemas.Question = new SimpleSchema({
  title: {
    type: String,
    label: 'title',
    //min: 30
  },

  description: {
    type: String,
    label: 'company',
    optional:true
  },

  askerId: {
    type: String,
    label: 'asked ID',
    //TODO : add regex check to make sure it's a github link
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },

});

Questions.attachSchema(Schemas.Question);
