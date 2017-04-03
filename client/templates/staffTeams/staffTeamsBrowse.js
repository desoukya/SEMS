Template.staffTeamsBrowse.helpers({
	staffTeams() {
		return StaffTeams.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},

});

Template.staffTeamCard.helpers({
	membersCount() {
		return this.members.length;
	},

});
