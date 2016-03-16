Template.sideBar.helpers({

  canEdit() {
  	var userId = Meteor.userId();
  	console.log(userId, this._id);
  	if(!!userId && !!this._id)
    return TeamUtils.canEditTeam(userId,this._id);
  },

});