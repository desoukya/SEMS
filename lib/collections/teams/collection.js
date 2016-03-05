Teams = new Mongo.Collection('teams');

Teams.helpers({
  image() {
    var imageName = Companies.findOne({ _id: this.company }).image;
    return `/images/teams/${imageName}`;
  },

  companyName() {
    return Companies.findOne({ _id: this.company }).name;
  },

  teamMembers() {
    var usersIds = this.members;

    return Meteor.users.find({ _id: { $in: usersIds } });
  }

});
