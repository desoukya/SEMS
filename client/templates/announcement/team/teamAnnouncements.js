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
});
