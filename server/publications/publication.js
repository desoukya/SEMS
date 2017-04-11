Meteor.publish('users', function(roles = ROLES) {

	// Checking that roles is an array of strings
	check(roles, [String]);

	var userId = this.userId;
	var user = Meteor.users.findOne(userId);


	var filter = {
		fields: {
			profile: 1,
			roles: 1,
			pendingSurvey: 1,
		}
	};

	var selector = {};

	if(roles) {
		var filteredRoles = []
		_.each(roles, function(role) {
			if(_.contains(ROLES, role)) {
				filteredRoles.push(role);
			}
		});


		selector['roles'] = {
			$in: filteredRoles
		}

	}

	if(user) {
		// Admins can have full access to users
		if(Roles.userIsInRole(user, ADMIN)) {
			filter = {};
		}

		return [Meteor.users.find(selector, filter), Images.find({})];
	}
	// If user is not logged in return nothing to fire up ready()
	return [];
});

Meteor.publish('currUser', function() {
	return Meteor.users.find({
		_id: this.userId
	});
});
Meteor.publish('questionUsers', function() {
	return Meteor.users.find({}, {
		fields: {
			name: 1,
			profile: 1,
			roles: 1
		}
	})
})

Meteor.publish('usersSpecific', function(userId) {
	return Meteor.users.findOne({
		_id: userId
	})
})
Meteor.publish('questionsIds', function() {
	return Questions.find({}, {
		fields: {
			_id: 1
		}
	})
})
Meteor.publish('teamBasicInfo', function() {
	return Teams.find({}, {
		fields: {
			_id: 1,
			name: 1,
			isForStaff: 1,
			company: 1,
			members: 1,
			slug: 1
		}
	})
})

Meteor.publish('images', function() {
	return Images.find({});
});

Meteor.publish('survey', function() {
	return Survey.find({});
});

Meteor.publish('fullUsers', function() {
	return Meteor.users.find({});
});

Meteor.publish('files', function() {
	return Files.find({});
});

Meteor.publish('materials', function() {
	return Materials.find({});
});

Meteor.publish('teams', function() {
	return Teams.find({});
});
Meteor.publish('tags', function() {
	return Tags.find({});
});
Meteor.publish('tagsInfo', function() {
	return Tags.find({}, {
		fields: {
			name: 1,
			createdAt: 1,
		}
	});
});

Meteor.publish('tagsFilterInfo', function() {
	return Tags.find({}, {
		fields: {
			name: 1,
			type: 1,
		}
	});
});


Meteor.publish('companies', function() {
	return Companies.find({});
});

Meteor.publish('announcements', function() {
	return Announcements.find({
		milestone: {
			$ne: true
		}
	});
});

Meteor.publish('milestones', function() {
	return Announcements.find({
		milestone: true
	});
});

Meteor.publish('allAnnouncements', function() {
	return Announcements.find();
});

Meteor.publish('questions', function() {
	return Questions.find({});
});
Meteor.publish('questionsBasicInfo', function() {
	return Questions.find({}, {
		fields: {
			slug: 1,
			ownerId: 1,
			title: 1,
			createdAt: 1,
			upvotes: 1,
			downvotes: 1,
			viewers: 1,
			tags: 1,
			answers: 1
		}
	});
});
Meteor.publish('posts', function() {
	return Posts.find({});
});

Meteor.publish("answers", function() {
	return Answers.find({});
});

Meteor.publish('notifications', function() {
	return Notifications.find({
		ownerId: this.userId
	});

});

Meteor.publishComposite('questionData', function(questionSlug) {

	return {

		find() {
			return Questions.find({
				slug: questionSlug
			});

		},

		children: [

			{
				find(question) {
					let commentIds = question.comments || [];
					return Comments.find({
						_id: {
							$in: commentIds
						}
					});
				}
			},

			{

				find(question) {
					let answerIds = question.answers || [];
					return Answers.find({
						_id: {
							$in: answerIds
						}
					});
				},

				children: [

					{
						find(answer) {
							let commentIds = answer.comments || [];
							return Comments.find({
								_id: {
									$in: commentIds
								}
							});
						},

					}
				],

			}

		],

	}

});
