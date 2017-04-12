Router.route('/teams/', {
	name: 'team.browse',

	waitOn() {
		return [Meteor.subscribe('teamBasicInfo')];
	},

	action() {
		Session.set('title', 'Teams');
		this.render('browseTeam');
	},

});

Router.route('/teams/create', {
	name: 'team.create',

	waitOn() {
		if(!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
			this.ready();
		} else {
			return [Meteor.subscribe('teams'), Meteor.subscribe('companies')];
		}
	},

	action() {
		Session.set('title', 'Create Team');
		this.render('createTeam');
	},

	onBeforeAction() {
		if(!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
			this.redirect('team.browse');
		} else {
			this.next();
		}
	},

});

Router.route('/teams/:slug/about', {
	name: 'team.about',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
	},

	action() {
		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse')
		else {
			Session.set('title', `${team.name}`);
			this.render('teamAbout');
		}

	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	},

});

Router.route('/teams/:slug/posts', {
	name: 'team.posts',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teamSpecific', (this.params.slug)),
			Meteor.subscribe('TeamUsers', (this.params.slug)), Meteor.subscribe('posts')
		];
		//Meteor.subscribe('postsSpecific ', (this.params.slug))
	},

	action() {
		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse')
		else {
			Session.set('title', `${team.name}`);
			this.render('team.posts');
		}

	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	},

});

Router.route('/teams/:slug/edit', {
	name: 'team.edit',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teamSpecific', (this.params.slug)), Meteor.subscribe('TeamUsers', (this.params.slug))];
	},

	action() {
		var userId = Meteor.userId();

		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse');

		// Only if he is the Scrum of the team or have adminstrative role
		if((TeamUtils.isMember(userId, team._id) && Roles.userIsInRole(userId, [SCRUM])) ||
			Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			Session.set('title', 'Team settings');
			this.render('editTeam');
		} else
			this.redirect('team.info', {
				slug: this.params.slug
			});
	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	},

});


Router.route('/teams/:slug/info', {
	name: 'team.info',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teamSpecific', (this.params.slug)), Meteor.subscribe('TeamUsers', (this.params.slug))];
	},

	action() {
		var userId = Meteor.userId();

		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse');


		Session.set('title', `${team.name}`);

		if(TeamUtils.isMember(userId, team._id) ||
			Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('teamInfo');
		} else {
			// If not a member show the about page
			this.redirect('team.about', {
				slug: this.params.slug
			});
		}
	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	},

});

Router.route('/teams/:slug/grades', {
	name: 'team.gradebook',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse');

		if(TeamUtils.isMember(userId, team._id) || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			Session.set('title', 'Grades');
			this.render('teamGrades');
		} else
			this.redirect('team.info', {
				slug: this.params.slug
			});
	},

	data() {
		return Teams.findOne({
			slug: this.params.slug
		});
	},

});
