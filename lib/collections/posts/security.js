Posts.allow({
	insert() {
		// Only admin and higher roles can create posts
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA])) {
			return true
		}

		return false;
	},
	update() {
		// admin and higher roles can update posts
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA])) {
			return true;
		}

		return false;

	},
	remove() {
		// admin and higher roles can remove posts
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA])) {
			return true;
		}

		return false;
	}
});
