Router.route('/announcement/manage', {
	name: 'announcements.manage',

	waitOn() {
		return [Meteor.subscribe('allAnnouncements'), Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('staffGroups')];
	},

	action() {
		Session.set('title', 'SEMS | Admin');
		this.render('manageAnnouncement');
	},

});

Router.route('/teams/:slug/announcements', {
	name: 'team.announcements',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('announcements')];
	},

	action() {
		var userId = Meteor.userId();

		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse');


		if(TeamUtils.isMember(userId, team._id) ||
			Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			Session.set('title', 'Announcements');
			this.render('teamAnnouncements');
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


Router.route('/teams/:slug/milestones', {
	name: 'team.milestones',
	layoutTemplate: 'teamLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('milestones')];
	},

	action() {
		var userId = Meteor.userId();

		var team = Teams.findOne({
			slug: this.params.slug
		});

		if(!team)
			this.redirect('team.browse');


		if(TeamUtils.isMember(userId, team._id) ||
			Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			Session.set('title', 'Milestones');
			this.render('teamMilestones');
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


Router.route('/milestones/:_id', {
	name: 'team.milestone',
	layoutTemplate: 'mainLayout',

	waitOn() {
		return [Meteor.subscribe('teams'), Meteor.subscribe('milestones')];
	},

	action() {
		var userId = Meteor.userId();
		var milestone = Announcements.findOne({
			_id: this.params._id
		});
		var haveAdminAccess = Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]);

		if(!milestone) //go Home you are drunk
			this.redirect('home');

		var userTeam = Teams.findOne({
			members: userId
		});

		if(!userTeam && !haveAdminAccess) //go Home you are a ForEverAlone
			this.redirect('home');

		if(!haveAdminAccess && !milestone.global && !_.contains(milestone.teams, userTeam._id)) {
			this.redirect('home'); //go home and stop stalking.
		} else {
			Session.set('title', 'Milestone');
			this.render('milestoneDetailed');
		}

	},

	data() {
		return Announcements.findOne({
			_id: this.params._id
		});
	},

});
