Template.commentEditModal.helpers({
  commentData() {
    let commentId = Session.get('commentId');

    return Comments.findOne({ _id: commentId });
  },

});
