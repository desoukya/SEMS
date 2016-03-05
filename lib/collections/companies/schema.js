var Schemas = {};

Schemas.Companies = new SimpleSchema({
  image: {
    type: String,
    label: 'image',
  },
  name: {
    type: String,
    label: 'company name',
  }
});

Companies.attachSchema(Schemas.Companies);
