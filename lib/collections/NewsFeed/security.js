NewsFeed.allow({
	insert(userId, doc) {
		return false;
	},

	update(userId, doc) {
		return Meteor.userId() === doc.feedOwnerId;
	},

	remove(userId, doc) {
		return Meteor.userId() === doc.feedOwnerId;
	}
});
