Template.notificationsHistory.helpers({
	notifications() {
		return Notifications.find({
			ownerId: Meteor.userId()
		}, {
			sort: {
				createdAt: -1
			}
		});
	},

});

Template.notificationsHistory.events({
	'click #read_all_notifications_button': function(event, template) {
		Meteor.call('readAllNotifications');
	},

	'click #delete_all_notifications_button': function(event, template) {
		$('#delete-notifications-modal').modal({
			onApprove() {
				Meteor.call('deleteAllNotifications', function(err) {
					if(err)
						sAlert.error(err.reason);
				});
			}
		}).modal('show');
	}
});
