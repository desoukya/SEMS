StaffTeams = new Mongo.Collection('staffTeams');


StaffTeams.helpers({
	staffMembers() {
		var usersIds = this.members;

		return Meteor.users.find({
			_id: {
				$in: usersIds
			}
		});
	}
})
