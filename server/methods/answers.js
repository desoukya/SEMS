Meteor.methods({
  createAnswer(answerData) {
    var { description, questionId } = answerData;

    var answer = {
      ownerId: Meteor.userId(),
      description: description,
      createdAt: new Date()
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
      Answers.remove({ _id: answerId });
    } else
      throw new Meteor.Error(401, "You are not authorized to delete this answer");


  },

});
