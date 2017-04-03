Template.staffTeamAnnouncements.helpers({
	getAnnouncements() {
		return Announcements.find({
			teams: {
				$in: [this._id]
			}
		})
	}
})
