Template.profile.helpers({
	isCurrentUser() {
		return Meteor.userId() === this._id;
	},

	email() {
		if(this.emails)
			return this.email();
		else
			return this.profile.publicEmail;

	},

	teamId() {
		var team = TeamUtils.getTeam(this._id);

		if(team) {
			return team._id;
		}
	},

	teamSlug() {
		var team = TeamUtils.getTeam(this._id);

		if(team) {
			return team.slug;
		}
	},

	teamName() {
		var team = TeamUtils.getTeam(this._id);

		if(team) {
			return team.name;
		}
	},
	getAnswers() {

		var answersCount = this.allAnswersCount(this._id).answersCount;

		return answersCount;
	},
	getBestAnswers() {
		var bestAnswersCount = this.allAnswersCount(this._id).bestAnswersCount;

		return bestAnswersCount;

	},
	getSubscriptions() {


		var userSubscriptions = Meteor.user().subscriptions;
		var existingUserSubscriptions = Tags.find({
			name: {
				$in: userSubscriptions
			}
		}).fetch();
		if(userSubscriptions.length !== existingUserSubscriptions.length) {

			//this step is done as subscriptions is an array of strings, but existingUserSubscriptions is an array of objects

			var subscriptions = []
			for(var i = 0; i < existingUserSubscriptions.length; i++) {
				subscriptions[i] = existingUserSubscriptions[i].name
			}

			var userId = Meteor.userId();

			let userSubscriptions = {
				subscriptions,
				userId
			}
			Meteor.call('updateSubscriptions', userSubscriptions, function(err) {
				if(err) sAlert.error(err.reason);
			})
		}

		return Meteor.user().subscriptions;

	},
	getFollowedQuestions() {
		Meteor.subscribe('questions');

		var alreadyFollowedQuestions = Meteor.user().questionsFollowed;

		var existingQuestionsFollowed = Questions.find({
			_id: {
				$in: alreadyFollowedQuestions
			}
		}).fetch();

		if(alreadyFollowedQuestions.length !== existingQuestionsFollowed.length) {
			//this step is done as followedQuestions is an array of strings, but existingQuestionsFollowed is an array of objects
			var questions = []
			for(var i = 0; i < existingQuestionsFollowed; i++) {
				questions[i] = existingQuestionsFollowed[i]._id;
			}

			var userId = Meteor.userId();
			let followedQuestions = {
				questions: questions,
				userId

			}
			Meteor.call('updateFollowedQuestions', followedQuestions, function(err) {
				if(err) sAlert.error(err.reason);
			})
		}

		return Meteor.user().questionsFollowed;
	},

});

Template.profiletag.events({

	'click #deleteTag': function(event) {
		var subscriptions = Meteor.user().subscriptions;
		var tagName = this;

		var removed = false;
		for(var i = 0; i < subscriptions.length; i++) {
			if(subscriptions[i] == tagName) {
				subscriptions.splice(i, 1);
				removed = true
				break;
			}
		}
		var userId = Meteor.userId();

		let userSubscriptions = {
			subscriptions,
			userId
		}

		Meteor.call('updateSubscriptions', userSubscriptions, function(err) {
			if(err)
				sAlert.error(err.reason);
		})

	}
})
