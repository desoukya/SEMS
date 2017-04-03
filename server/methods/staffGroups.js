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
			posts,
		} = teamInfo

		StaffGroups.update(_id, {
			$set: {
				posts: posts
			}
		})

	}


})
