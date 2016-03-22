Meteor.methods({
  createAnswer(answerData) {
    var { description, questionId } = answerData;

    var answer = {
      ownerId: Meteor.userId(),
      description: description,
      upvotes:[],
      downvotes:[],
      createdAt: Date.now()
    }

    // Add the new answer and get the id
    var answerId = Answers.insert(answer);

    // Append the answer to the question
    Questions.update({ _id: questionId }, { $push: { answers: answerId } });

  },

  deleteAnswer(answerId) {
    let answer = Answers.findOne({ _id: answerId });
    let userId = Meteor.userId();

    if (!answer)
      throw new Meteor.Error(404, "The answer you are trying to delete is not found");

    if (userId === answer.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA])) {
      Questions.update({ answers: answerId }, { $pull: { answers: answerId } });
      Answers.remove({ _id: answerId });
    } else
      throw new Meteor.Error(401, "You are not authorized to delete this answer");

  },

  updateAnswer(answerData) {
    let { answerId, description } = answerData;
    let answer = Answers.findOne({ _id: answerId });
    let userId = Meteor.userId();

    if (!answer)
      throw new Meteor.Error(404, "The answer you are trying to edit is not found");

    if (userId === answer.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      Answers.update({ _id: answerId }, { $set: { description: description } });
    } else
      throw new Meteor.Error(401, "You are not authorized to edit this answer");


  },

  upvoteAnswer(answerId) {
    let answer = Answers.findOne({ _id: answerId });
    let userId = Meteor.userId();
    let upvotes = answer.upvotes
      .map(function(x) {
        return x.ownerId
      });

    if (!answer)
      throw new Meteor.Error(404, 'The Answer you are upvoting is not found');

    if (answer.ownerId === userId)
      throw new Meteor.Error(401, 'You are not allowed to upvote your own answer');

    let upvote = { 'ownerId': userId, 'createdAt': Date.now() };

    if (_.contains(upvotes, userId)) // Upvoted already, remove from upvoters
      Answers.update({ _id: answerId }, { $pull: { 'upvotes': { 'ownerId': userId } } });
    else {
      // Upvote and remove from downvoters
      Answers.update({ _id: answerId }, { $push: { 'upvotes': upvote } });
      Answers.update({ _id: answerId }, { $pull: { 'downvotes': { 'ownerId': userId } } });
    }

  },

  downvoteAnswer(answerId) {
    let answer = Answers.findOne({ _id: answerId });
    let userId = Meteor.userId();
    let downvotes = answer.downvotes
      .map(function(x) {
        return x.ownerId
      });

    if (!answer)
      throw new Meteor.Error(404, 'The Answer you are downvoting is not found');

    if (answer.ownerId === userId)
      throw new Meteor.Error(401, 'You are not that bad, don\'t downvote your answer');

    let downvote = { 'ownerId': userId, 'createdAt': Date.now() };

    if (_.contains(downvotes, userId)) // Downvoted already, remove from downvoters
      Answers.update({ _id: answerId }, { $pull: { 'downvotes': { 'ownerId': userId } } });
    else {
      // Downvote and remove from upvoters
      Answers.update({ _id: answerId }, { $push: { 'downvotes': downvote } });
      Answers.update({ _id: answerId }, { $pull: { 'upvotes': { 'ownerId': userId } } });
    }
  },


});
