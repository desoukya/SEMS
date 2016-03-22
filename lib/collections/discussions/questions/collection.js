Questions = new Mongo.Collection('questions');

QuestionsIndex = new EasySearch.Index({
  collection: Questions,
  fields: ['title'],
  engine: new EasySearch.Minimongo({

  }),
  defaultSearchOptions: {
    limit: 3
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
  }

});