var Schemas = {};

Schemas.Team = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
    max: 33,
    min: 3
  },

  company: {
    type: String,
    label: 'company'
  },

  logo: {
    type: String,
    label: 'team logo',
    max: 200,
    optional: true
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

  metrics:{
    type:[Object]
  },

  "metrics.$.totalWeeklyLines":{
    type: Number
  },

  "metrics.$.lineAdditions":{
    type: Number
  },

  "metrics.$.standardDev":{
    type: Number
  },

  "metrics.$.timeStamp":{
    type: Date
  },

  dailyPoints:{
    type: Number
  }

});

Teams.attachSchema(Schemas.Team);
