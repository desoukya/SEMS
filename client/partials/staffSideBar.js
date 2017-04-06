Template.staffSideBar.helpers({
	canPost() {
		var userId = Meteor.userId();
		if(this.members) {
			if(this.members.indexOf(userId) != -1) {
				return true;
			}
		}
		return false;
	},
	canEdit() {
		var userId = Meteor.userId();
		if(Roles.userIsInRole(userId, ADMIN)) {
			return true;
		}
		return false;
	}

})
