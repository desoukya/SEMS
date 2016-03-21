Meteor.methods({
  deleteQuestion(questionId) {
    let question = Questions.findOne({ _id: questionId });

    if (!question)
      return;
    else {
      // Remove all answers related to this question
      Answers.remove({ _id: { $in: question.answers } });

      // Delete self
      Questions.remove({ _id: questionId });

    }

  },


});
