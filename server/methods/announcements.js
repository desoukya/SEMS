// ES6
Meteor.methods({
  createAnnouncement(announcement) {
    // TODO: Check the arguments passed from client - Never Trusted !
    announcement.createdAt = Date.now();
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]))
      return Announcements.insert(announcement);
    else
      throw new Meteor.Error(401, 'Not authorized to create an Announcement');
  },

  updateAnnouncement(data) {
    // TODO: Check the arguments passed from client - Never Trusted !
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return Announcements.update({ _id: data._id }, { $set: data.announcement });
    } else
      throw new Meteor.Error(401, 'Not authorized to edit an Announcement');
  },

});
