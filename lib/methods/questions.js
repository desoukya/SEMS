Meteor.methods({
  updateQuestionViewsCount(questionId) {
    Questions.update({ _id: questionId }, { $addToSet: { viewers: Meteor.userId() } });
  }
});
