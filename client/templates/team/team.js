// ES6
Template.team.helpers({
  teamName() {
    return this.name;
  },

  teamImage() {
    return TeamUtils.getDefaultPhoto(this._id);
  },
  users() {
    console.log(Meteor.users.find({roles:'student'}).count());
    return Meteor.users.find({roles:'student'});
  }
});

Template.userChoice.helpers({
  username() {
    return this.profile.firstName + " " + this.profile.lastName;
  },
});
Template.team.onRendered(function() {
  $('.ui.search.dropdown')
    .dropdown({
      maxSelections: 3
    });

  /*$('.ui.dropdown')
    .dropdown();*/
});