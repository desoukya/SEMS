Template.sideBar.helpers({

  canEdit() {
    var userId = Meteor.userId();

    if (!!userId && !!this._id)
      return TeamUtils.canEditTeam(userId, this._id);
  },

});
