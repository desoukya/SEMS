Template.questionPage.onRendered(function() {
  Meteor.call('updateQuestionViewsCount', this.data._id);
});
