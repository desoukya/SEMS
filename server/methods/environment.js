Meteor.methods({
  getNodeEnv() {
    return Meteor.settings.environment;
  },

});
