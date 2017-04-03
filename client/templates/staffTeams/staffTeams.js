Template.staffTeams.onRendered(function() {
	$('.ui.dropdown').dropdown({
		allowAdditions: true,
		direction: 'downward'
	});
})

Template.createStaffTeam.helpers({

	getStaffMembers() {
		return Meteor.users.find({
			roles: {
				$in: ['admin', 'teaching-assistant', 'junior-teaching-assistant', 'lecturer']
			}
		}).fetch()
	},
	getStaffTeams() {

		return StaffTeams.find({}, {
			sort: {
				createdAt: -1
			}
		}).fetch();
	}

})

Template.createStaffTeam.events({
	'submit .form': function(event) {
		event.preventDefault();
		let name = event.target.teamName.value;
		let members = $('#members').val().split(",");
		let links = [];
		console.log(members)
		let teamInfo = {
			name,
			members,
			links
		}
		Meteor.call('createStaffTeam', teamInfo, function(err) {
			if(err) {
				sAlert.error(err.reason);
			}
		})
		$('.ui.multiple.selection.dropdown').dropdown('clear');
		event.target.teamName.value = '';


	},
	'click #delete-icon': function() {

		let teamId = this._id;
		Meteor.call('deleteStaffTeam', teamId, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
	}
})
