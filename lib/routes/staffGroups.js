Router.route('/staff-groups', {
	name: 'staff-groups',

	waitOn() {
		return [Meteor.subscribe('staffGroups'), Meteor.subscribe('users')];
	},

	action() {
		Session.set('title', 'SEMS | Admin');
		this.render('staffGroups');
	},

});

Router.route('/staff-groups-browse/', {
	name: 'staffGroups.browse',

	waitOn() {
		return [Meteor.subscribe('staffGroups')];
	},

	action() {
		Session.set('title', 'Staff Groups');
		this.render('StaffGroupsBrowse');
	},

});


Router.route('/staff-groups/:name', {
	name: 'staffGroup.info',
	layoutTemplate: 'staffGroupLayout',

	waitOn() {
		return [Meteor.subscribe('staffGroups'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = StaffGroups.findOne({
			name: this.params.name
		});


		if(!staffGroup) {
			this.redirect('staffGroups.browse');

		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffGroupsInfo');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return StaffGroups.findOne({
			name: this.params.name
		});
	}
});

Router.route('/staff-groups/:name/posts', {
	name: 'staffGroup.posts',
	layoutTemplate: 'staffGroupLayout',

	waitOn() {
		return [Meteor.subscribe('staffGroups'), Meteor.subscribe('users'), Meteor.subscribe('posts')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = StaffGroups.findOne({
			name: this.params.name
		});

		if(!staffGroup) {
			this.redirect('staffGroups.browse');
		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffGroupPosts');
		} else {

			this.redirect('home');
		}
	},

	data() {
		return StaffGroups.findOne({
			name: this.params.name
		});
	}

});
Router.route('/staff-groups/:name/announcements', {
	name: 'staffGroup.announcements',
	layoutTemplate: 'staffGroupLayout',

	waitOn() {
		return [Meteor.subscribe('staffGroups'), Meteor.subscribe('users'), Meteor.subscribe('announcements')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = StaffGroups.findOne({
			name: this.params.name
		});

		if(!staffGroup) {
			this.redirect('staffGroups.browse');
		}


		Session.set('title', `${staffGroup.name}`);

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			this.render('staffGroupAnnouncements');
		} else {

			this.redirect('home');
		}
	},
	data() {
		return StaffGroups.findOne({
			name: this.params.name
		});
	}

});

Router.route('/staff-groups/:name/edit', {
	name: 'staffGroup.edit',
	layoutTemplate: 'staffGroupLayout',

	waitOn() {
		return [Meteor.subscribe('staffGroups'), Meteor.subscribe('users')];
	},

	action() {
		var userId = Meteor.userId();

		var staffGroup = StaffGroups.findOne({
			name: this.params.name
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
		return StaffGroups.findOne({
			name: this.params.name
		});
	}

});
