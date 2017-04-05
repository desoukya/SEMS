Template.staffGroupsBrowse.helpers({
	staffGroups() {
		return StaffGroups.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},

});

Template.staffGroupCard.helpers({
	membersCount() {
		return this.members.length;
	},

});
