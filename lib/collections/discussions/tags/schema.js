var Schemas = {};

Schemas.Tag = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
  },
  course:{
    type: Boolean,
    label: 'course'
  }



});

Tags.attachSchema(Schemas.Tag);
