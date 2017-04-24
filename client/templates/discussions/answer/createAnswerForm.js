Template.createAnswerForm.helpers({
	questionClosed() {
		let questionId = Template.parentData(1)._id;
		let question = Questions.findOne({
			_id: questionId
		})
		return !(question.isClosed())

	}
})
Template.createAnswerForm.onCreated(function() {
	var template = this;
	template.input = new ReactiveVar('')
	template.output = new ReactiveVar('')
	template.autorun(() => {
		var input = template.input.get()
		template.output.set(input);
	})

})

Template.createAnswerForm.events({
	'submit #create-answer-form': function(event, template) {
		event.preventDefault();

		var description = event.target.answer.value;

		// Get the question Id from questionPage template
		var questionId = Template.parentData(1)._id;

		var answer = {
			description,
			questionId,

		};

		Meteor.call('createAnswer', answer, function(err) {
			if(err)
				sAlert.error(err.reason);
			else
				event.target.answer.value = "";

		});

	},
	'keyup textarea': function(event, template) {
		var input = template.$(event.currentTarget).val();
		template.input.set(input);
	}

});
