Template.staffTeamAnnouncements.helpers({
	getTeamAnnouncements() {
		return Announcements.find({
			teams: {
				$in: [this._id]
			}
		})
	},
	getGlobalAnnouncements() {
		return Announcements.find({
			global: true
		});
	}
})
