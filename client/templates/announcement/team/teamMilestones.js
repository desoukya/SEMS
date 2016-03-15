Template.teamMilestones.helpers({
  milestones() {
        return Announcements.find({$or:[{global:true},{teams:this._id}]}, {
      'createdAt': -1
    });
  },
});