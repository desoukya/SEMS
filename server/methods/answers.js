Meteor.methods({
  createAnswer(answerData,email) {
    var { description, questionId } = answerData;

    var answer = {
      ownerId: Meteor.userId(),
      description: description,
      upvotes: [],
      downvotes: [],
      createdAt: Date.now()
    }

    // Add the new answer and get the id
    var answerId = Answers.insert(answer);

    // Append the answer to the question
    Questions.update({ _id: questionId }, { $push: { answers: answerId } });

    let question = Questions.findOne({ _id: questionId });
    let icon = "<i class=\"idea icon\"></i>";
    let content = "New answer on your question";
    let link = `/discussions/${question.slug}`;

if(answer.ownerId!=question.ownerId){
    Notifications.insert({
      ownerId: question.ownerId,
      content: `${icon} ${content}`,
      link: link,
      read: false,
      createdAt: Date.now()
    });
if(email == undefined)
email = Meteor.settings.adminEmail

    Email.send({
      to: email,
      from: Meteor.settings.systemEmail,
      subject: "[SEMS] New answer",
      text: `Hello User, your question has a new answer`
    });
  }

  },

  deleteAnswer(answerId) {
    let answer = Answers.findOne({ _id: answerId });
    let userId = Meteor.userId();

    if (!answer)
      throw new Meteor.Error(404, "The answer you are trying to delete is not found");

    if (userId === answer.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
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

      let icon = "<i class=\"green thumbs up icon\"></i>";
      let user = Meteor.users.findOne({ _id: userId });
      let content = "upvoted your answer";
      // FIXME: This should be refactored
      let question = Questions.findOne({ answers: answerId });
      let link = `/discussions/${question.slug}`;

      Notifications.insert({
        ownerId: answer.ownerId,
        content: `${icon} ${user.profile.firstName} ${content}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });

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

      let icon = "<i class=\"red thumbs down icon\"></i>";
      let content = "Your answer is downvoted";
      // FIXME: This should be refactored
      let question = Questions.findOne({ answers: answerId });
      let link = `/discussions/${question.slug}`;

      Notifications.insert({
        ownerId: answer.ownerId,
        content: `${icon} ${content}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });

    }
  },

  markBestAnswer(data) {
    let { questionId, answerId, marked } = data;
    let answer = Answers.findOne({ _id: answerId });
    let question = Questions.findOne({ _id: questionId });

    if (!question || !answer)
      throw new Meteor.Error(404, "Resource not found");

    // Remove best answer from all other answers
    let answersIds = question.answers;

    answersIds.forEach(function(id) {
      Answers.update({ _id: id }, { $set: { bestAnswer: false } });
    });

    // Toggle the current answer's bestAnswer flag
    marked = !marked;

    Answers.update({ _id: answerId }, { $set: { bestAnswer: marked } });

    let icon = "<i class=\"yellow star icon\"></i>";
    let content = "your answer is marked as best answer";
    let link = `/discussions/${question.slug}`;

    // I shouldn't notify myself that I marked my answer as the
    // best answer :v
    if (Meteor.userId() !== answer.ownerId) {
      Notifications.insert({
        ownerId: answer.ownerId,
        content: `${icon} ${content}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });

    }
  }


});
