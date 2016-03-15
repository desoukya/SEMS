Template.manageAnnouncement.helpers({
  announcements() {
    return Announcements.find({}, {
      'createdAt': -1
    });
  },
});
Template.manageAnnouncement.onRendered(function() {

  //monitor when the selected material is changed
  Tracker.autorun(function() {
    var announcementId = Session.get('selectedAnnouncementId');
    if (announcementId === '') {

    } else {
      if (!!announcementId) {
        //show new Material form
        $('#announcement-edit-modal').modal({
          onHidden: function() {
            Session.set('selectedAnnouncementId', '');
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
          Announcements.remove(self._id);
        }
      }).modal('show');
  },

  'click #edit-icon': function() {
    Session.set('selectedAnnouncementId', this._id);
  },

});