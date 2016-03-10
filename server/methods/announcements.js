// ES6
Meteor.methods({
  createAnnouncement(announcement) {
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]))
      return Announcements.insert(announcement);
    else
      throw new Meteor.Error(401, "Not authorized to create an Announcement");
  },
});