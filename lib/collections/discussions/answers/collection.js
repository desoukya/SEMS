Answers = new Mongo.Collection('answers');

Answers.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

  question() {
    return Questions.findOne({ answers: this._id });
  },

});
