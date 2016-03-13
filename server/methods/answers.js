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

});
