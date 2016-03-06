Questions = new Mongo.Collection('questions');

Questions.helpers({
  asker() {
    return Meteor.users.findOne({ _id: this.ownerId }).profile;
  },

});
