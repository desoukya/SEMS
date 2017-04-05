StaffGroups.allow({
	insert() {
		// Only admins can create staff new teams
		if(Roles.userIsInRole(Meteor.userId(), ADMIN)) {
			return true
		}

		return false;
	},
	update() {
		// admin and higher roles can update staff teams
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN])) {
			return true;
		}

		return false;

	},
	remove() {
		// admin can't remove teams
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN])) {
			return true;
		}

		return false;
	}
});

StaffGroups.deny({
	insert() {
		// Not logged in ? get out !
		if(!UserUtils.isLoggedIn()) {
			return true;
		}
		return false;
	},
	update() {
		if(!UserUtils.isLoggedIn()) {
			return true;
		}
		return false;
	},
	remove() {
		if(!UserUtils.isLoggedIn()) {
			return true;
		}
		return false;
	}
});
