Meteor.methods({

	createStaffTeam(teamInfo) {
		let {
			name,
			members,
			links,
		} = teamInfo

		if(name == "") {
			throw new Meteor.Error(401, "Please specify a team name");
		}
		if(members == []) {
			throw new Meteor.Error(401, "You can't create an empty team");
		}
		if(!(StaffTeams.findOne({
				"name": name
			}))) {
			StaffTeams.insert({
				"name": name,
				"members": members,
				"links": links,
				createdAt: Date.now()
			})
		} else {
			throw new Meteor.Error(401, "This name already exists");
		}
	},

	deleteStaffTeam(teamId) {
		if(StaffTeams.findOne({
				_id: teamId
			})) {
			StaffTeams.remove(teamId)
		} else {
			throw new Meteor.Error("The staff team you're trying to delete is not found")
		}
	},

	updateLinks(teamInfo) {
		let {
			_id,
			links,
		} = teamInfo

		StaffTeams.update(_id, {
			$set: {
				links: links
			}
		})

	}


})
