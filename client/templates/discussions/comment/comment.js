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

  'click #edit-comment-icon': function(event, template) {
    event.preventDefault();
    let self = this;
    Session.set('commentId', this._id);

    Meteor.defer(function() {
      $('#edit-comment-modal').modal({
        closable: true,
        onDeny() {

        },

        onApprove() {
          let commentId = self._id;
          let content = $("textarea[name=comment_content]").val();

          let comment = { commentId, content };

          Meteor.call('updateComment', comment, function(err) {
            if (err)
              sAlert.error(err.reason);
          });

        },

        onHide() {
          // Clear the session on modal hide
          Session.set('commentId', undefined);
        }

      }).modal('show');
    });
  }

});
