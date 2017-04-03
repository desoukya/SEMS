Template.staffGroups.onRendered(function() {
	$('.ui.dropdown').dropdown({
		allowAdditions: true,
		direction: 'downward'
	});
})

Template.createStaffGroup.helpers({

	getStaffMembers() {
		return Meteor.users.find({
			roles: {
				$in: ['admin', 'teaching-assistant', 'junior-teaching-assistant', 'lecturer']
			}
		}).fetch()
	},
	getStaffGroups() {

		return StaffGroups.find({}, {
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

		let teamInfo = {
			name,
			members,
			posts,
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
