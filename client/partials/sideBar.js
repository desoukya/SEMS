Template.sideBar.helpers({

	canEdit() {
		var userId = Meteor.userId();

		if(!!userId && !!this._id)
			return TeamUtils.canEditTeam(userId, this._id);
	},
	canPost() {
		var userId = Meteor.userId();
		if(this.members) {
			if(this.members.indexOf(userId) != -1) {
				return true;
			}
		}
		return false;
	},
	viewingStaff() {
		var routeName = Router.current().route.getName();
		if(routeName == 'staffGroup.posts' || routeName == 'staffGroup.announcements' || routeName == 'staffGroup.edit' || routeName == 'staffGroup.info') {
			return true;
		}
		return false;
	},
	viewingTeams() {
		var routeName = Router.current().route.getName();
		if(routeName == 'team.info' || routeName == 'team.about' || routeName == 'team.gradebook' || routeName == 'team.posts' || routeName == 'team.announcements' || routeName == 'team.milestones' || routeName == 'team.edit') {
			return true;
		}
		return false;
	},

});
