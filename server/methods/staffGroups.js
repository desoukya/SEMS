Meteor.methods({

	createStaffGroup(teamInfo) {
		let {
			name,
			members,
			posts,
			company,
			githubRepo
		} = teamInfo

		if(name == "") {
			throw new Meteor.Error(401, "Please specify a group name");
		}
		if(members == []) {
			throw new Meteor.Error(401, "You can't create an empty group");
		}
		if(!(Teams.findOne({
				"name": name
			}))) {
			Teams.insert({
				"name": name,
				"members": members,
				"posts": posts,
				"isForStaff": true,
				"company": company,
				"repo": githubRepo,
				createdAt: Date.now()
			})
			let group = Teams.findOne({
				name: name
			});
			let icon = "<i class=\"hand peace icon\"></i>";
			let content = "You have been added to the staff group ( " + name + " )";
			let link = `/staff-groups/${group.slug}`;
			for(var i = 0; i < members.length; i++) {
				if(members[i] != Meteor.userId()) {
					Notifications.insert({
						ownerId: members[i],
						content: `${icon} ${content}`,
						link: link,
						read: false,
						objectId: group._id,
						createdAt: Date.now()
					});
				}
			}
		} else {
			throw new Meteor.Error(401, "This name already exists");
		}
	},

	deleteStaffGroup(teamId) {
		if(Teams.findOne({
				_id: teamId
			})) {
			Notifications.remove({
				objectId: teamId
			});
			Notifications.remove({
				parentObjectId: teamId
			});
			NewsFeed.remove({
				parentObjectId: teamId
			})
			Teams.remove(teamId)
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
			groupSlug
		} = groupInfo


		if(groupName == "") {
			throw new Meteor.Error(401, "Please specify a group name");
		}
		if(membersCombined == []) {
			throw new Meteor.Error(401, "You can't have an empty group");
		}

		Teams.update({
			"_id": groupId
		}, {
			$set: {
				"members": membersCombined,
			}
		})
		let icon = "<i class=\"hand peace icon\"></i>";
		let content = "You have been added to the staff group ( " + groupName + " )";
		let link = `/staff-groups/${groupSlug}`;
		//new members
		if(newMembers.length != 0) {
			for(var i = 0; i < newMembers.length; i++) {
				if(newMembers[i] != Meteor.userId()) {
					Notifications.insert({
						ownerId: newMembers[i],
						content: `${icon} ${content}`,
						link: link,
						read: false,
						objectId: groupId,
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
			removedMember,
			groupSlug
		} = groupInfo

		if(members == []) {
			throw new Meteor.Error(401, "You can't have an empty group");
		}

		Teams.update({
			"_id": groupId
		}, {
			$set: {
				"members": members,
			}
		})

		let icon = "<i class=\"hand peace icon\"></i>";
		let content = "You have been removed from the staff group ( " + groupName + " )";
		let link = `/staff-groups/${groupSlug}`;
		//new members

		if(removedMember != Meteor.userId()) {
			Notifications.insert({
				ownerId: removedMember,
				content: `${icon} ${content}`,
				link: link,
				read: false,
				objectId: groupId,
				createdAt: Date.now()
			});
		}

	},
	sendNotification(groupInfo) {
		let {
			groupName,
			members,
			groupSlug
		} = groupInfo
		let group = Teams.findOne({
			name: groupName,
			isForStaff: true
		})

		let icon = "<i class=\"hand peace icon\"></i>";
		let content = "You group name has been updated ( " + groupName + " )";
		let link = `/staff-groups/${groupSlug}`;
		for(var i = 0; i < members.length; i++) {
			Notifications.insert({
				ownerId: members[i],
				content: `${icon} ${content}`,
				link: link,
				read: false,
				objectId: group._id,
				createdAt: Date.now()
			});
		}
	}



})
