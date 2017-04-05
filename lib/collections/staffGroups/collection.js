StaffGroups = new Mongo.Collection('staffGroups');


StaffGroups.helpers({
	staffMembers() {
		var usersIds = this.members;

		return Meteor.users.find({
			_id: {
				$in: usersIds
			}
		});
	}
})
