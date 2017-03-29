Template.answerEditModal.helpers({
	answer() {
		let answerId = Session.get('answerId');

		return Answers.findOne({
			_id: answerId
		});
	},

});
