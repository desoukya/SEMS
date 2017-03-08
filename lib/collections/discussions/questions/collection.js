Questions = new Mongo.Collection('questions');

QuestionsIndex = new EasySearch.Index({
  collection: Questions,
  name: 'questionsIndex',
  fields: ['title'],

  engine: new EasySearch.MongoDB({
    beforePublish:function(action, doc)  {
      //add hasCorrectAnswer field to questions
      let answersIds = doc.answers;
      let answers = Answers.find({ _id: { $in: answersIds } });
      doc.hasCorrectAnswer = !!answers.fetch().filter((answer)=>answer.bestAnswer).length;

      // always return the document
      return doc;
    },
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

QuestionsSuggestionsIndex = new EasySearch.Index({
  collection: Questions,
  name: 'questionsSuggestionsIndex',
  fields: ['title'],

  engine: new EasySearch.MongoDB({
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

Questions.friendlySlugs({
  slugFrom: 'title',
  slugField: 'slug',
  createOnUpdate: true,
  distinct: true,
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

  answersCount() {
    return this.answers.length || 0;
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
    let commentsIds = this.comments || [];
    return Comments.find({ _id: { $in: commentsIds } }, { sort: { createdAt: 1 } });
  },

  collectionName() {
    return 'Questions';
  },

  commentsCount() {
    if (this.comments)
      return this.comments.length;
    return 0;
  },

});
