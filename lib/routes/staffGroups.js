Router.route('/staff-groups', {
	name: 'staff-groups',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('companies')];
	},

	action() {
		Session.set('title', 'SEMS | Admin');
		this.render('staffGroups');
	},

});

Router.route('/staff-groups-browse/', {
	name: 'staffGroups.browse',

	waitOn() {
		return [Meteor.subscribe('teamBasicInfo')];
	},

	action() {
		Session.set('title', 'Staff Groups');
		this.render('browseTeam');
	},

});


Router.route('/staff-groups/:slug', {
	name: 'staffGroup.info',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = Teams.findOne({
			slug: this.params.slug
		});


		if(!staffGroup) {
			this.redirect('staffGroups.browse');

		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('teamInfo');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	}
});

Router.route('/staff-groups/:slug/posts', {
	name: 'staffGroup.posts',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('posts')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = Teams.findOne({
			slug: this.params.slug
		});

		if(!staffGroup) {
			this.redirect('staffGroups.browse');
		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('teamPosts');
		} else {

			this.redirect('home');
		}
	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	}

});
Router.route('/staff-groups/:slug/announcements', {
	name: 'staffGroup.announcements',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('announcements')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = Teams.findOne({
			slug: this.params.slug
		});

		if(!staffGroup) {
			this.redirect('staffGroups.browse');
		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('teamAnnouncements');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	}

});

Router.route('/staff-groups/:slug/edit', {
	name: 'staffGroup.edit',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = Teams.findOne({
			slug: this.params.slug
		});

		if(!staffGroup) {
			this.redirect('staffGroups.browse');
		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN])) {
			this.render('staffGroupEdit');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	}

});
