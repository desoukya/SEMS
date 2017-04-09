// Meteor.subscribe("leaderboardSortedTeams");
Template.home.helpers({
	isInTeam() {
		return TeamUtils.isInTeam(Meteor.userId());
	},

	isInSeveralGroups() {
		var groups = Teams.find({
			members: {
				$in: [Meteor.userId()]
			},
			isForStaff: true
		}).fetch();
		if(groups.length > 1) {
			return true;
		}
		return false;
	},

	isInGroup() {
		var group = Teams.findOne({
			members: {
				$in: [Meteor.userId()]
			},
			isForStaff: true
		})
		return group;
	},

	groupName() {
		var group = Teams.findOne({
			members: {
				$in: [Meteor.userId()]
			},
			isForStaff: true
		})
		return group.name;
	},

	getTeamSlug() {
		return TeamUtils.getTeam(Meteor.userId()).slug;
	},
	getGroupSlug() {
		return TeamUtils.getGroup(Meteor.userId()).slug;
	},
	teams() {
		return Teams.find({}).map(function(item, index) {
			item.number = index + 1;
			return item;
		});
	},


	// leaderboardSettings() {
	// 	return {
	// 		rowsPerPage: 40,
	// 		showNavigation: 'auto',
	// 		filters: ['myFilter'],
	// 		fields: [{
	// 			key: 'number',
	// 			label: 'Position',
	// 			headerClass: 'leaderboard-head leaderboard-score center aligned',
	// 			tmpl: Template.numberRenderTmpl,
	// 			sortOrder: 1,
	// 			sortDirection: 'ascending'
	// 		}, {
	// 			key: 'name',
	// 			label: 'Name',
	// 			headerClass: 'leaderboard-head center aligned',
	// 			cellClass: 'name-cell center aligned',
	// 			sortable: false
	// 		}, {
	// 			key: 'company.image',
	// 			label: 'Company',
	// 			headerClass: 'leaderboard-head center aligned',
	// 			tmpl: Template.imageRenderTmpl,
	// 			sortable: false
	// 		}, {
	// 			key: 'metrics.dailyPoints',
	// 			label: 'Score',
	// 			headerClass: 'leaderboard-head leaderboard-score center aligned',
	// 			cellClass: 'score-cell center aligned',
	// 			sortOrder: 0,
	// 			sortDirection: 'descending'
	// 		}]
	// 	};
	// }
});

Template.numberRenderTmpl.helpers({

	isFirst(number) {
		return number == 1;
	}

});

Template.home.events({
	'click .table tbody tr': function() {
		var team = this;
		if(this.siteUrl) {
			var win = window.open(this.siteUrl, '_blank');
			win.focus();
		} else {
			sAlert.warning(this.name + " did not add their deployment link or did not deploy yet");
		}
	}
});
