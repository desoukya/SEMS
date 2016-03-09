Meteor.startup(function() {
  if (process.env.METEOR_ENV === 'production') {
    process.env.ROOT_URL = Meteor.settings.ROOT_URL;
  }
});
