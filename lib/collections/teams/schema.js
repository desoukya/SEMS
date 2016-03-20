var Schemas = {};

Schemas.Company = new SimpleSchema({
  _id: {
    type: String,
    label: 'image',
  },
  image: {
    type: String,
    label: 'image',
  },
  name: {
    type: String,
    label: 'company name',
  }
});

Schemas.slug = new SimpleSchema({
  base: {
    type: String,
  },
  index: {
    type: Number,
  },
});

Schemas.friendlySlugs = new SimpleSchema({
  slug: {
    type: Schemas.slug,
  },
});

Schemas.Team = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
    max: 33,
    min: 3
  },

  slug: {
    type: String,
    label: 'slug',
    optional: true
  },

  friendlySlugs: {
    type: Schemas.friendlySlugs,
    optional:true
  },

  company: {
    type: Schemas.Company,
    label: 'company'
  },

  repo: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Github Repo',
    //TODO : add regex check to make sure it's a github link
  },

  members: {
    type: [String],
    minCount: 1,
    maxCount: 8,
    //TODO : add a custom validator to make sure the members are not in another team
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },

});

Teams.attachSchema(Schemas.Team);
