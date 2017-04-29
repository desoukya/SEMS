Template.manageAnnouncement.helpers({
	announcements() {
		return Announcements.find({}, {
			sort: {
				createdAt: -1
			}
		});
	},
});

Template.manageAnnouncement.onRendered(function() {

	// Monitor when the announcement Id in session changes
	Tracker.autorun(function() {
		var announcementId = Session.get('selectedAnnouncementId');
		if(announcementId !== '') {
			if(!!announcementId) {

				$('#announcement-edit-modal').modal({
					onHidden: function() {
						Session.set('selectedAnnouncementId', '');
					},
					onVisible: function() {
						$('.ui.dropdown').dropdown();
						$('.modal').modal('refresh');
					},
				}).modal('show');
			}
		}

	});

});

Template.manageAnnouncement.events({

	'click #delete-icon': function() {
		var self = this;
		$('#delete-item-modal')
			.modal({
				closable: false,
				onDeny() {
					//do nothing
				},
				onApprove() {
					var announcementId = self._id;
					Meteor.call('deleteAnnouncement', announcementId, function(err) {
						if(err)
							sAlert.error(err.reason);
					})
				}

			}).modal('show');
	},

	'click #add-button': function(event) {
		event.preventDefault()
		$('#announcement-create-modal').modal('show');
	},

	'click #edit-icon': function() {
		Session.set('selectedAnnouncementId', this._id);
	},

});
