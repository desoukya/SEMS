Questions = new Mongo.Collection('questions');

QuestionsIndex = new EasySearch.Index({
  collection: Questions,

  fields: ['title'],

  engine: new EasySearch.Minimongo({
    transform(doc) {
      return Questions._transform(doc);
    },

    sort() {
      return { createdAt: -1 };
    },
  }),

  defaultSearchOptions: {
    limit: 8
  },

});

Questions.helpers({
  owner() {
    return Meteor.users.findOne({
      _id: this.ownerId
    });
  },

  answersObjects() {
    let answersIds = this.answers;

    return Answers.find({ _id: { $in: answersIds } });
  },

  totalVotes() {
    return this.upvotes.length - this.downvotes.length || 0;
  },

  views() {
    if (this.viewers)
      return this.viewers.length;
    return 0;
  },

  commentObjects() {
    let commentsIds = this.comments;
    return Comments.find({ _id: { $in: this.commentsIds } });
  }

});
