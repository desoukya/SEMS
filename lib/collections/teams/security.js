Teams.allow({
	insert() {
		// Only Scrums can create new teams
		if(Roles.userIsInRole(Meteor.userId(), SCRUM)) {

			// User can't create multiple teams
			var alreadyCreated = Teams.findOne({
				members: Meteor.userId()
			});

			if(alreadyCreated) {
				return false;
			}

			return true;
		}

		return false;
	},
	update() {
		// Scrums and higher roles can update teams
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, SCRUM])) {
			return true;
		}

		return false;

	},
	remove() {
		// Scrums can't remove teams, only TAs and higher
		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
			return true;
		}

		return false;
	}
});

Teams.deny({
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
