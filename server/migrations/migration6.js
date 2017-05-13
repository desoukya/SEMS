Migrations.add({
	version: 6,
	name: 'add objectId, parentObjectId fields to Notifications/newsFeed to track the object deletion',
	up: function() {
		notifications = Notifications.find({});
		notifications.forEach(function(notification) {
			Notifications.update({
				_id: notification._id
			}, {
				$set: {
					objectId: "empty",
					parentObjectId: "empty"
				}
			}, false, true)
		});
		newsFeed = NewsFeed.find({});
		newsFeed.forEach(function(news) {
			NewsFeed.update({
				_id: news._id
			}, {
				$set: {
					parentObjectId: "empty"
				}
			}, false, true)
		});
	},
	down: function() {

	}
});
