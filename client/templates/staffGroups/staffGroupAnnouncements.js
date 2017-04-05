Template.staffGroupAnnouncements.helpers({
	getGroupAnnouncements() {
		return Announcements.find({
			teams: {
				$in: [this._id]
			}
		}, {
			sort: {
				createdAt: -1
			}
		})
	},
	getGlobalAnnouncements() {
		return Announcements.find({
			global: true
		}, {
			sort: {
				createdAt: -1
			}
		});
	}
})
