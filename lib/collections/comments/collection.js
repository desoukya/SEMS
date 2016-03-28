Comments = new Mongo.Collection('comments');

Comments.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

});
