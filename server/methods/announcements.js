// ES6
Meteor.methods({
  createAnnouncement(announcement) {
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]))
      return Announcements.insert(announcement);
    else
      throw new Meteor.Error(401, 'Not authorized to create an Announcement');
  },

  updateAnnouncement(data) {
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return Announcements.update({ _id: data._id }, { $set: data.announcement });
    } else
      throw new Meteor.Error(401, 'Not authorized to edit an Announcement');
  },

});
