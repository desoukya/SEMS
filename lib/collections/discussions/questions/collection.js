Questions = new Mongo.Collection('questions');

Questions.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

});
