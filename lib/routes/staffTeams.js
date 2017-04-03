Router.route('/staff-teams', {
	name: 'staff-teams',

	waitOn() {
		return [Meteor.subscribe('staffTeams'), Meteor.subscribe('users')];
	},

	action() {
		Session.set('title', 'SEMS | Admin');
		this.render('staffTeams');
	},

});


Router.route('/staff-teams/:name', {
	name: 'staffTeam.info',
	layoutTemplate: 'staffTeamLayout',

	waitOn() {
		return [Meteor.subscribe('staffTeams'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffTeam = StaffTeams.findOne({
			name: this.params.name
		});


		// if(!(staffTeam)) {
		// 	this.redirect('hallOfFame');
		// }


		Session.set('title', `${staffTeam.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffTeamsInfo');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return StaffTeams.findOne({
			name: this.params.name
		});
	}
});

Router.route('/staff-teams/:name/links', {
	name: 'staffTeam.links',
	layoutTemplate: 'staffTeamLayout',

	waitOn() {
		return [Meteor.subscribe('staffTeams'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffTeam = StaffTeams.findOne({
			name: this.params.name
		});

		// if(!staffTeam) {
		// 	this.redirect('home');
		// }


		Session.set('title', `${staffTeam.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffTeamLinks');
		} else {

			this.redirect('home');
		}
	},

	data() {
		return StaffTeams.findOne({
			name: this.params.name
		});
	}

});
Router.route('/staff-teams/:name/announcements', {
	name: 'staffTeam.announcements',
	layoutTemplate: 'staffTeamLayout',

	waitOn() {
		return [Meteor.subscribe('staffTeams'), Meteor.subscribe('users'), Meteor.subscribe('announcements')];
	},

	action() {
		var userId = Meteor.userId();

		var staffTeam = StaffTeams.findOne({
			name: this.params.name
		});

		// if(!staffTeam) {
		// 	this.redirect('hallOfFame');
		// }


		Session.set('title', `${staffTeam.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffTeamAnnouncements');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return StaffTeams.findOne({
			name: this.params.name
		});
	}

});
