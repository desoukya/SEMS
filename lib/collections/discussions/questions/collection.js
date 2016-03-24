Questions = new Mongo.Collection('questions');

QuestionsIndex = new EasySearch.Index({
  collection: Questions,
  fields: ['title'],
  engine: new EasySearch.Minimongo({
    transform: function(doc) {
      return Questions._transform(doc);
    }
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

    return Answers.find({
      _id: {
        $in: answersIds
      }
    });

    return Answers.find({ _id: { $in: answersIds } });
  },

  totalVotes() {
    return this.upvotes.length - this.downvotes.length || 0;
  }

});
