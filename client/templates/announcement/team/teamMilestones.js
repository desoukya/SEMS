Template.teamMilestones.onRendered(function() {
	$('.date.meta').popup({
		inline: true
	});
});

Template.teamMilestones.helpers({
	milestones() {
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

Template.milestone.helpers({
	descriptionPreview() {
		if(this.description.length > 400)
			return this.description.substring(0, 400) + " ...";
		else
			return this.description;
	}
});
