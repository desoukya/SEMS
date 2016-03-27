Template.comment.helpers({
  user() {
    return Meteor.users.findOne({ _id: this.ownerId });
  },

  canEdit() {
    return Meteor.userId() === this.ownerId ||
      Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA]);
  }

});


Template.comment.events({
  'click #edit-comment-icon': function(event, template) {
    let parent = Template.parentData(1);
    let collectionName = parent.collectionName();
    let commentId = this._id;
    let parentId = parent._id;


  },

  'click #delete-comment-icon': function(event, template) {
    let parent = Template.parentData(1);
    let collectionName = parent.collectionName();
    let commentId = this._id;
    let parentId = parent._id;

    let data = { collectionName, commentId, parentId };

    $('#delete-comment-modal').modal({
      onDeny() {

      },
      onApprove() {

        Meteor.call('deleteComment', data, function(err) {
          if (err)
            sAlert.error(err.reason);
        });

      }
    }).modal('show');




  },

});
