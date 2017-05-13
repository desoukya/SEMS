Issues = new Mongo.Collection('issues');

Issues.helpers({
	owner() {
		return Meteor.users.findOne({
			_id: this.ownerId
		});
	},
	commentObjects() {
    let commentsIds = this.comments || [];
    return Comments.find({ _id: { $in: commentsIds } }, { sort: { createdAt: 1 } });
  },
});
