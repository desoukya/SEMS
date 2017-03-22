Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  GUCId: {
    type: String,
    regEx: Regex.GUCId
  },

  tutorialGroup: {
    type: String,
    allowedValues: ['CSEN 10', 'CSEN 11', 'CSEN 12', 'CSEN 13', 'CSEN 14', 'CSEN 15', 'CSEN 16', 'CSEN 17', 'CSEN 18', 'CSEN 19', 'BI 15', 'BI 16', 'BI 17', 'BI 18', 'Adminstration'],
  },

  mobile: {
    type: String,
    regEx: Regex.mobileNumber,
    optional: true
  },

  githubUser: {
    type: String,
    optional: true
  },

  publicEmail: {
    type: String,
    optional: true
  },

  image: {
    type: String,
    optional: true
  }

});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },


  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },

  'emails.$': {
    type: Object
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  'emails.$.verified': {
    type: Boolean
  },

  createdAt: {
    type: String
  },

  profile: {
    type: Schema.UserProfile
  },

  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: [String],
    optional: true
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  },

  metrics:{
    type:[Object],
    optional: true
  },


  "metrics.$.totalWeeklyLines":{
    type: Number
  },

  "metrics.$.lineAdditions":{
    type: Number
  },

  "metrics.$.createdAt":{
    type: Date
  },

  questions: {
    type: [Object],
    optional: true
  },

  "questions.$.id": {
    type: String
  },

  "questions.$.ques": {
    type: String
  },

  "questions.$.value": {
    type: Number
  },

  pendingSurvey:{
    type: Boolean,
    defaultValue: true
  },
  subscriptions:{
    type :[String],
    defaultValue: []

  },
  questionsFollowed:{
    type: [String],
    defaultValue: []
  },
bestAnswers:{
  type: Number,
  defaultValue: 0
},
answers:{
  type: Number,
  defaultValue: 0
},


  // "metrics.$.currentWeek":{
  //   type: String
  // }

});

Meteor.users.attachSchema(Schema.User);
