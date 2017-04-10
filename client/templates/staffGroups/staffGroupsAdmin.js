Template.staffGroups.onRendered(function() {
	$('.ui.dropdown').dropdown({
		allowAdditions: true,
		direction: 'downward'
	});
})

Template.createStaffGroup.helpers({
	companies() {
		return Companies.find({});
	},
	getStaffMembers() {
		return Meteor.users.find({
			roles: {
				$in: ['admin', 'teaching-assistant', 'junior-teaching-assistant', 'lecturer']
			}
		}).fetch()
	},
	getStaffGroups() {

		return Teams.find({
			isForStaff: true
		}, {
			sort: {
				createdAt: -1
			}
		}).fetch();
	}

})

Template.createStaffGroup.events({
	'submit .form': function(event) {
		event.preventDefault();
		let name = event.target.groupName.value;
		let members = $('#members').val().split(",");
		let posts = [];
		//cant create a team without a company, so using any company name
		let company = Companies.findOne({
			name: "angular"
		});
		let githubRepo = "https://github.com/desoukya/sems"

		let teamInfo = {
			name,
			members,
			posts,
			company,
			githubRepo
		}
		Meteor.call('createStaffGroup', teamInfo, function(err) {
			if(err) {
				sAlert.error(err.reason);
			}
		})
		$('.ui.multiple.selection.dropdown').dropdown('clear');
		event.target.groupName.value = '';


	},
	'click #delete-icon': function() {

		let teamId = this._id;
		Meteor.call('deleteStaffGroup', teamId, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
	}
})
