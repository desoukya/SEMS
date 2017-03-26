Template.answer.onRendered(function() {
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	$('.ui.accordion').accordion();
});


Template.answer.helpers({
	canEdit() {
		var userId = Meteor.userId();
		return this.ownerId === userId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]);
	},

	detailedDate() {
		return moment(this.createdAt, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('LLL');
	},

	activeUp() {
		let answer = Answers.findOne({
			_id: this._id
		});

		if(!answer)
			return

		let upvoters = answer.upvotes
			.map(function(x) {
				return x.ownerId;
			});

		return _.contains(upvoters, Meteor.userId()) ? 'green' : '';

	},

	activeDown() {
		let answer = Answers.findOne({
			_id: this._id
		});

		if(!answer)
			return

		let downvoters = answer.downvotes
			.map(function(x) {
				return x.ownerId;
			});

		return _.contains(downvoters, Meteor.userId()) ? 'red' : '';

	},

	isQuestionOwner() {
		let question = Template.parentData(1);
		return Meteor.userId() === question.ownerId;
	},

	bestAnswerActive() {
		if(this.bestAnswer)
			return 'green';
		else
			return 'grey';
	}

});


Template.answer.events({
	'click #delete-icon': function(event, template) {
		event.preventDefault();
		let self = this;

		$('#delete-answer-modal').modal({
			closable: true,
			onDeny() {

			},
			onApprove() {

				let answerId = self._id;

				// Delete this bad answer
				Meteor.call('deleteAnswer', answerId, function(err) {
					if(err)
						sAlert.error(err.reason);
				});

			}
		}).modal('show');

	},

	'click #edit-icon': function(event, template) {
		event.preventDefault();
		let self = this;

		// Setting id in session to grab data context in modal
		Session.set('answerId', this._id);

		// The worst practice ever ... :|
		Meteor.defer(function() {
			$('#answer-edit-modal').modal({
				closable: true,
				onDeny() {

				},

				onApprove() {

					let answerId = self._id;
					let description = $("textarea[name=answer_description]").val();

					let answer = {
						answerId,
						description
					};

					Meteor.call('updateAnswer', answer, function(err) {
						if(err)
							sAlert.error(err.reason);
					});


				},

				onHide() {
					// Clear the session on modal hide
					Session.set('answerId', undefined);
				}

			}).modal('show');
		});

	},

	'click #upvote': function(event) {
		Meteor.call('upvoteAnswer', this._id, function(err) {
			if(err)
				sAlert.error(err.reason);
		});

	},

	'click #downvote': function(event) {
		Meteor.call('downvoteAnswer', this._id, function(err) {
			if(err)
				sAlert.error(err.reason);
		});
	},

	'click #best-answer-icon': function(event) {
		let question = Template.parentData(1);

		let data = {
			questionId: question._id,
			answerId: this._id,
			marked: this.bestAnswer
		};

		if(Meteor.userId() === question.ownerId) {
			Meteor.call('markBestAnswer', data, function(err) {
				if(err)
					sAlert.error(err.reason);
			});
		}
	}


});
