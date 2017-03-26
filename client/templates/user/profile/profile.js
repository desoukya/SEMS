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

		var subscriptions = Meteor.user().subscriptions;
		var length = subscriptions.length;
		var tagDeleted = new Array(length);
		//initialze array with false
		for(var i = 0; i < tagDeleted.length; i++) {

			tagDeleted[i] = false;
		}
		//check if a subscribed tag is deleted from tags
		for(var i = 0; i < subscriptions.length; i++) {
			if(!(Tags.findOne({
					name: subscriptions[i]
				})))

			{
				tagDeleted[i] = true;
			}
		}

		//removing deleted tags of tags collection from subscriptions
		for(var i = 0; i < tagDeleted.length; i++) {
			if(tagDeleted[i] == true) {
				subscriptions.splice(i, 1)

			}
		}
		var userId = Meteor.userId();

		let userSubscriptions = {
			subscriptions,
			userId
		}

		Meteor.call('updateSubscriptions', userSubscriptions, function(err) {
			if(err) sAlert.error(err.reason);
		})
		return Meteor.user().subscriptions;

	},
	getFollowedQuestions() {
		Meteor.subscribe('questions');

		var array = Meteor.user().questionsFollowed;
		var length = array.length;
		if(length != 0) {
			var questionDeleted = new Array(length);
			//initialze array with false
			for(var i = 0; i < questionDeleted.length; i++) {

				questionDeleted[i] = false;
			}
			//check if a followed question is deleted from discussions
			for(var i = 0; i < array.length; i++) {


				if(Questions.find({
						_id: array[i]
					}).fetch().length == 0)

				{
					questionDeleted[i] = true;
				}

			}

			//removing deleted questions of questions collection from questions followed
			for(var i = 0; i < questionDeleted.length; i++) {
				if(questionDeleted[i] == true) {
					array.splice(i, 1)

				}
			}
			var userId = Meteor.userId();
			let followedQuestions = {
				questions: array,
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
