Router.route('/profile/edit', {
	name: 'user.profile.edit',

	waitOn() {

		return [Meteor.subscribe('usersSpecific', (Meteor.userId()))];

	},

	action() {
		Session.set('title', 'Your profile');
		this.render('profileEdit');
	},

	data() {
		return Meteor.userId() && Meteor.user();
	},

});

Router.route('/profile/:_id', {
			name: 'user.profile',

			waitOn() { <<
				<< << < HEAD
				return [Meteor.subscribe('answersProfileInfo'),
						Meteor.subscribe('usersSpecific', (this.params._id)),
						Meteor.subscribe('teamBasicInfo'), Meteor.subscribe('tagsType'), Meteor.subscribe('questionsIds') ===
						=== =
						return [Meteor.subscribe('answers'), Meteor.subscribe('users'),
							Meteor.subscribe('teams'), Meteor.subscribe('tags'), Meteor.subscribe('questions') >>>
							>>> > origin / dev
						];
					},

					action() {
						var user = Meteor.users.findOne({
							_id: this.params._id
						});
						if(!user) {
							this.render('home');
						} else {
							Session.set('title', `${user.fullName()}`);
							this.render('profile');
						}
					},

					data() {
						return Meteor.users.findOne({
							_id: this.params._id
						});
					},

			});
