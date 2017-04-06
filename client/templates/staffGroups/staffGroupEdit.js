Template.staffGroupEdit.helpers({
	availableMembers() {
		var groupMembers = this.members;

		return Meteor.users.find({
			roles: {
				$in: ['teaching-assistant', 'admin', 'junior-teaching-assistant', 'lecturer']
			},
			_id: {
				$nin: groupMembers
			}
		});

	},
	groupMembers() {
		return Meteor.users.find({
			_id: {
				$in: this.members
			}
		})
	}

});

Template.staffGroupEdit.events({
	'click #addMembers': function(event) {
		//temp fix
		// return;

		var oldMembers = this.members;
		var newMembers = $('#members').val().split(',').filter(function(idString) {
			return idString.length > 0;
		});
		var membersCombined = oldMembers.concat(newMembers);
		let groupId = this._id;
		let groupName = this.name;

		let groupInfo = {
			groupId,
			groupName,
			membersCombined,
			newMembers,

		}

		Meteor.call('addMembersToGroup', groupInfo, function(err, res) {
			if(err) {
				sAlert.error(err.reason);
			}
		});

		// clear selected values
		$('.ui.search.dropdown').dropdown('clear');
	},

	'click #changeGroupName': function(event) {
		if($('#groupName').parent().hasClass('disabled')) {
			$('#groupName').parent().removeClass('disabled');
			$('#changeGroupName').addClass('green');

		} else {
			var groupName = $('#groupName').val()
			StaffGroups.update({
				_id: this._id
			}, {
				$set: {
					name: groupName
				}
			}, function(err) {
				if(err)
					sAlert.error('Can\'t update this name');
				else {
					$('#groupName').parent().addClass('disabled');
					$('#changeGroupName').removeClass('green');
				}
			});
			Router.go(`/staff-groups/${groupName}`);


		}

	}

});

Template.staffGroupEdit.onRendered(function() {
	$('.ui.search.dropdown')
		.dropdown({
			maxSelections: 8,
			forceSelection: false
		});
});

//--------------------------------------------------------------


Template.editableGroupMember.events({
	'click #delete-icon': function(event, template) {
		var groupId = Template.parentData(1)._id;
		var group = StaffGroups.findOne({
			_id: groupId
		});
		var groupName = group.name
		var members = group.members;
		var removedMember = this._id;
		members.splice(removedMember, 1)

		var groupInfo = {
			groupId,
			groupName,
			members,
			removedMember
		}




		Meteor.call('removeFromGroup', groupInfo, function(err) {
			if(err) {
				sAlert.error(err.reason);
			}
		});
	},
});
