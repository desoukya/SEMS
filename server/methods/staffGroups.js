Meteor.methods({

	createStaffGroup(teamInfo) {
		let {
			name,
			members,
			posts,
		} = teamInfo

		if(name == "") {
			throw new Meteor.Error(401, "Please specify a team name");
		}
		if(members == []) {
			throw new Meteor.Error(401, "You can't create an empty team");
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
			throw new Meteor.Error("The staff team you're trying to delete is not found")
		}
	},

	updatePosts(teamInfo) {
		let {
			_id,
			postOwnerId,
			posts,
		} = teamInfo



		var group = StaffGroups.findOne(_id: _id);
		StaffGroups.update(_id, {
			$set: {
				posts: posts
			}
		})

		let icon = "<i class=\"idea icon\"></i>";
		let content = "New post on your team";
		let link = `/staff-groups/${group.name}/posts`;

		for(var i = 0; i < group.members.length; i++) {
			if(group.members[i] != postOwnerId) {
				Notifications.insert({
					ownerId: group.members[i],
					content: `${icon} ${content}`,
					link: link,
					read: false,
					createdAt: Date.now()
				});
			}
		}






	}

})
