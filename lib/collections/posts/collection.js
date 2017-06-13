Posts = new Mongo.Collection('posts');


Posts.helpers({
	owner() {
		return Meteor.users.findOne({
			_id: this.ownerId
		});
	},
})
