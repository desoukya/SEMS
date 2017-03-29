Router.route('/discussions', {
	name: 'discussions',

	waitOn() {
		return [Meteor.subscribe('answers'), Meteor.subscribe('users'), Meteor.subscribe('tags'), Meteor.subscribe('questions')];
	},

	action() {
		Session.set('title', 'Discussions');
		this.render('discussions');
	},

});

Router.route('/discussions/:slug', {
	name: 'question.page',

	waitOn() {
		return [Meteor.subscribe('questionData', this.params.slug), Meteor.subscribe('users'), Meteor.subscribe('tags')];
	},

	action() {
		var question = Questions.findOne({
			slug: this.params.slug
		});

		if(!question) {
			this.render('discussions');
		} else {
			Session.set('title', `${question.title}`);
			this.render('questionPage');
		}
	},

	data() {
		return Questions.findOne({
			slug: this.params.slug
		});
	},

});
