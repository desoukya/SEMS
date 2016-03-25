Teams = new Mongo.Collection('teams');

Teams.helpers({
  image() {
    if (this.company) {
      var imageName = this.company.image;
      return `/images/teams/${imageName}`;
    }
    else{
      console.log(this)
    }
  },

  companyName() {
    return this.company.name;
  },

  teamMembers() {
    var usersIds = this.members;

    return Meteor.users.find({ _id: { $in: usersIds } });
  }

});

Teams.friendlySlugs({
  slugFrom: 'name',
  slugField: 'slug',
  createOnUpdate: true,
  distinct: true,
});