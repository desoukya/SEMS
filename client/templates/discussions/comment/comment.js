Template.comment.helpers({
  user() {
    return Meteor.users.findOne({ _id: this.ownerId });
  }
});
