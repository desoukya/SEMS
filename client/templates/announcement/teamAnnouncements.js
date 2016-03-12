Template.teamAnnouncements.helpers({
  announcements() {
    return Announcements.find({teams:this._id}, {
      'createdAt': -1
    });
  },
});