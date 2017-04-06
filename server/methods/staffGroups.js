Meteor.methods({

	createStaffGroup(teamInfo) {
		let {
			name,
			members,
			posts,
		} = teamInfo

		if(name == "") {
			throw new Meteor.Error(401, "Please specify a group name");
		}
		if(members == []) {
			throw new Meteor.Error(401, "You can't create an empty group");
		}
		if(!(StaffGroups.findOne({
				"name": name
			}))) {
			StaffGroups.insert({
				"name": name,
				"members": members,
				"posts": posts,
				createdAt: Date.now()
			})
			let icon = "<i class=\"hand peace icon\"></i>";
			let content = "You have been added to the staff group ( " + name + " )";
			let link = `/staff-groups/${name}`;
			for(var i = 0; i < members.length; i++) {
				if(members[i] != Meteor.userId()) {
					Notifications.insert({
						ownerId: members[i],
						content: `${icon} ${content}`,
						link: link,
						read: false,
						createdAt: Date.now()
					});
				}
			}
		} else {
			throw new Meteor.Error(401, "This name already exists");
		}
	},

	deleteStaffGroup(teamId) {
		if(StaffGroups.findOne({
				_id: teamId
			})) {
			StaffGroups.remove(teamId)
		} else {
			throw new Meteor.Error("The staff group you're trying to delete is not found")
		}
	}

	,
	addMembersToGroup(groupInfo) {
		let {
			groupId,
			groupName,
			membersCombined,
			newMembers,
		} = groupInfo


		if(groupName == "") {
			throw new Meteor.Error(401, "Please specify a group name");
		}
		if(membersCombined == []) {
			throw new Meteor.Error(401, "You can't have an empty group");
		}

		StaffGroups.update({
			"_id": groupId
		}, {
			$set: {
				"members": membersCombined,
			}
		})
		let icon = "<i class=\"hand peace icon\"></i>";
		let content = "You have been added to the staff group ( " + groupName + " )";
		let link = `/staff-groups/${groupName}`;
		//new members
		if(newMembers.length != 0) {
			for(var i = 0; i < newMembers.length; i++) {
				if(newMembers[i] != Meteor.userId()) {
					Notifications.insert({
						ownerId: newMembers[i],
						content: `${icon} ${content}`,
						link: link,
						read: false,
						createdAt: Date.now()
					});
				}
			}
		}


	},
	removeFromGroup(groupInfo) {
		let {
			groupId,
			groupName,
			members,
			removedMember
		} = groupInfo

		if(members == []) {
			throw new Meteor.Error(401, "You can't have an empty group");
		}

		StaffGroups.update({
			"_id": groupId
		}, {
			$set: {
				"members": members,
			}
		})

		let icon = "<i class=\"hand peace icon\"></i>";
		let content = "You have been removed from the staff group ( " + groupName + " )";
		let link = `/staff-groups/${groupName}`;
		//new members

		if(removedMember != Meteor.userId()) {
			Notifications.insert({
				ownerId: removedMember,
				content: `${icon} ${content}`,
				link: link,
				read: false,
				createdAt: Date.now()
			});
		}

	},



})
