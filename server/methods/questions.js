Meteor.methods({

  createQuestion(data) {

    let { Bot } = require('../slack');

    let { title, description, tags } = data;

    let question = {
      title: title,
      description: description,
      tags: tags,
      ownerId: Meteor.userId(),
      answers: [],
      upvotes: [],
      downvotes: [],
      createdAt: Date.now()
    };

    Questions.insert(question);
    Bot.send(`New Question Added : ${question.title}`);
  },

  deleteQuestion(questionId) {
    let question = Questions.findOne({ _id: questionId });
    let userId = Meteor.userId();


    if (!question)
      throw new Meteor.Error(404, 'The question you are trying to delete is not found');

    if (userId === question.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {

      // Remove all answers related to this question
      Answers.remove({ _id: { $in: question.answers } });

      // Delete self
      Questions.remove({ _id: questionId });

    } else
      throw new Meteor.Error(401, 'You are not authorized to delete this question !');


  },

  updateQuestion(questionData) {
    let { questionId, title, description, tags } = questionData;
    let userId = Meteor.userId();
    let question = Questions.findOne({ _id: questionId });

    if (!question)
      throw new Meteor.Error(404, 'The question you are trying to update doesn\'t exist !');

    if (userId === question.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      Questions.update({ _id: questionId }, { $set: { title: title, description: description, tags: tags } });
    } else
      throw new Meteor.Error(401, 'You are not authorized to edit this question');

  },

  upvoteQuestion(questionId) {
    let question = Questions.findOne({ _id: questionId });
    let userId = Meteor.userId();
    let upvotes = question.upvotes
      .map(function(x) {
        return x.ownerId
      });

    if (!question)
      throw new Meteor.Error(404, 'The Question you are upvoting is not found');

    if (question.ownerId === userId)
      throw new Meteor.Error(401, 'You are not allowed to upvote your own question');

    let upvote = { 'ownerId': userId, 'createdAt': Date.now() };

    if (_.contains(upvotes, userId)) // Upvoted already, remove from upvoters
      Questions.update({ _id: questionId }, { $pull: { 'upvotes': { 'ownerId': userId } } });
    else {
      // Upvote and remove from downvoters
      Questions.update({ _id: questionId }, { $push: { 'upvotes': upvote } });
      Questions.update({ _id: questionId }, { $pull: { 'downvotes': { 'ownerId': userId } } });

      let icon = "<i class=\"green thumbs up icon\"></i>";
      let user = Meteor.users.findOne({ _id: userId });
      let content = "upvoted your question";
      let link = `/discussions/${question.slug}`;

      Notifications.insert({
        ownerId: question.ownerId,
        content: `${icon} ${user.profile.firstName} ${content}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });
    }

  },

  downvoteQuestion(questionId) {
    let question = Questions.findOne({ _id: questionId });
    let userId = Meteor.userId();
    let downvotes = question.downvotes
      .map(function(x) {
        return x.ownerId
      });

    if (!question)
      throw new Meteor.Error(404, 'The Question you are downvoting is not found');

    if (question.ownerId === userId)
      throw new Meteor.Error(401, 'You are not that bad, don\'t downvote your question');

    let downvote = { 'ownerId': userId, 'createdAt': Date.now() };

    if (_.contains(downvotes, userId)) // Downvoted already, remove from downvoters
      Questions.update({ _id: questionId }, { $pull: { 'downvotes': { 'ownerId': userId } } });
    else {
      // Downvote and remove from upvoters
      Questions.update({ _id: questionId }, { $push: { 'downvotes': downvote } });
      Questions.update({ _id: questionId }, { $pull: { 'upvotes': { 'ownerId': userId } } });

      let icon = "<i class=\"red thumbs down icon\"></i>";
      let content = "Your question is downvoted";
      let link = `/discussions/${question.slug}`;

      Notifications.insert({
        ownerId: question.ownerId,
        content: `${icon} ${content}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });

    }
  },

  getAllTags() {
    var everything = Questions.find().fetch();
    var allQuestionsTags = _.pluck(everything, "tags");
    var allQuestionsTagsConcatinatedArray = [].concat.apply([], allQuestionsTags);
    return _.uniq(allQuestionsTagsConcatinatedArray);
  }


});
