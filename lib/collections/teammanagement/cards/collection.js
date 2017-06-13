Cards = new Mongo.Collection('cards');

Cards.helpers({
	owner() {
		return Meteor.users.findOne({
			_id: this.ownerId
		});
	}
});
