Answers = new Mongo.Collection('answers');

Answers.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

  question() {
    return Questions.findOne({ answers: this._id });
  },

  totalVotes() {
    return this.upvotes.length - this.downvotes.length || 0;
  },

  commentObjects() {
    let commentsIds = this.comments || [];
    return Comments.find({ _id: { $in: commentsIds } });
  }

});
