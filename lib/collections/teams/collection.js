Teams = new Mongo.Collection('teams');

Teams.helpers({
  image() {
    var imageName = this.company.image;
    return `/images/teams/${imageName}`;
  },

  companyName() {
    return this.company.name;
  },

  teamMembers() {
    var usersIds = this.members;

    return Meteor.users.find({ _id: { $in: usersIds } });
  }

});
