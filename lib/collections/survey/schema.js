var Schemas = {};

Schemas.Survey = new SimpleSchema({
  online: {
    type: Boolean,
    defaultValue: false
  }

});

Survey.attachSchema(Schemas.Survey);
