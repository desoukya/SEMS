Meteor.methods({

	createStaffTeam(teamInfo) {
		let {
			name,
			members
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
				createdAt: Date.now()
			})
		} else {
			throw new Meteor.Error(401, "This name already exists");
		}
	},
	deleteStaffTeam(teamId) {
		if(StaffTeams.findOne(_id: teamId)) {
			StaffTeams.remove(teamId)
		} else {
			throw new Meteor.Error("The staff team you're trying to delete is not found")
		}
	},
	updateStaffTeam(teamInfo) {
		let {
			_id,
			members
		} = teamInfo
		if(name == "") {
			throw new Meteor.Error(401, "Please specify a team name");
		}
		if(members == []) {
			throw new Meteor.Error(401, "You can't create an empty team");
		}

	}
})
