Notifications = new Mongo.Collection('notifications');

Notifications.read = function(id) {
  Notifications.update({ _id: id }, { $set: { read: true } });
}

Notifications.helpers({
  owner() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

});
