Template.teamAnnouncements.helpers({
	announcements() {
		return Announcements.find({
			$or: [{
				global: true
			}, {
				teams: this._id
			}]
		}, {
			sort: {
				createdAt: -1
			}
		});
	},

	viewingTeams() {
		var routeName = Router.current().route.getName();
		if(routeName == 'team.announcements') {
			return true;
		}
		return false;
	},
});
