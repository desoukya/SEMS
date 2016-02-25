// ES6
Template.team.helpers({
  teamName() {
    return this.name;
  },

  teamImage() {
    return TeamUtils.getDefaultPhoto(this._id);
  }

});
