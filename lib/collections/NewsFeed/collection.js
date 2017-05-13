NewsFeed = new Mongo.Collection('newsFeed');

NewsFeed.helpers({
	owner() {
		return Meteor.users.findOne({
			_id: this.ownerId
		});
	},

});
