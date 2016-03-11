Template.teamAnnouncements.helpers({
  announcements() {
    return Announcements.find({}, {
      'createdAt': -1
    });
  },
});