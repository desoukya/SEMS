Companies = new Mongo.Collection('companies');

Companies.deny({
  // No need to insert, update or delete anything now
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

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
