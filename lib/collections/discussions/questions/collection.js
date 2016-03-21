Questions = new Mongo.Collection('questions');

Questions.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

  answersObjects() {
    let answersIds = this.answers;

    return Answers.find({ _id: { $in: answersIds } });
  },

  totalVotes() {
    return this.upvotes.length - this.downvotes.length || 0;
  }

});
