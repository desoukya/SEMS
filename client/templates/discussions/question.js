Template.question.onRendered(function() {
	this.$('.question-owner-popup-activator').popup({
		popup: this.$('.special.popup'),
		hoverable: true,
		delay: {
			show: 300,
		}
	});
});

Template.question.helpers({

	isFollowing() {
		var question = this._id;
		var user = Meteor.users.findOne({
			_id: Meteor.userId()
		})
		var questionsFollowed = user.questionsFollowed;
		var found = false;
		for(var i = 0; i < questionsFollowed.length; i++) {
			if(questionsFollowed[i] == question) {
				found = true;
			}
		}
		return found;
	},
	role() {
		var question = Questions.find({
			_id: this._id
		}).fetch();

		var user = Meteor.users.find({
			_id: question[0].ownerId
		}).fetch();

		return user[0].roles[0];
	}
})
