var Schemas = {};

Schemas.Tag = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
  },
  lectures:{
    type: Boolean,
    label: 'Lectures',
    defaultValue: false,
  },
  labs:{
    type: Boolean,
    label: 'Labs',
    defaultValue: false,
  },
  project:{
    type: Boolean,
    label: 'Project',
    defaultValue: false,
  },
  topic:{
    type: Boolean,
    label: 'Topic',
    defaultValue: false,
  }






});

Tags.attachSchema(Schemas.Tag);
