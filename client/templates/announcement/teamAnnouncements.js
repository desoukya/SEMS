Template.teamAnnouncements.helpers({
  announcements() {
    return Announcements.find({$or:[{global:true},{teams:this._id}]}, {
      'createdAt': -1
    });
  },
});