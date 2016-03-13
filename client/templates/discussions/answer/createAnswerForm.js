Template.createAnswerForm.events({
  'submit #create-answer-form': function(event, template) {
    event.preventDefault();

    var description = event.target.answer.value;

    // Get the question Id from questionPage template
    var questionId = Template.parentData(1)._id;

    var answer = { description, questionId };

    Meteor.call('createAnswer', answer, function(err) {
      if (err)
        sAlert.error(err.reason);
    });

  },


});
