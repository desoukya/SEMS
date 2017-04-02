Template.questionPage.onRendered(function() {
	Meteor.call('updateQuestionViewsCount', this.data._id);
});

Template.questionPage.helpers({
	sortedAnswers() {
		// Sorting by top voted first, accepted answer always on top
		function sortFunction(elem1, elem2) {
			let firstVoteDiff = elem1.upvotes.length - elem1.downvotes.length;
			let secondVoteDiff = elem2.upvotes.length - elem2.downvotes.length;

			if(elem1.bestAnswer)
				return -1;

			if(elem2.bestAnswer)
				return 1;

			return secondVoteDiff - firstVoteDiff;
		};

		return Answers.find({
			_id: {
				$in: this.answers
			}
		}).fetch().sort(sortFunction);
	}
});
