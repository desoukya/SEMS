var Schemas = {};

Schemas.Tag = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
  }



});

Tags.attachSchema(Schemas.Tag);
