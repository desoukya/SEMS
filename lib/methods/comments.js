Meteor.methods({
  addComment(data) {
    let { collectionId, content, collectionType } = data;

    let commentId = Comments.insert({
      ownerId: Meteor.userId(),
      content: content,
      createdAt: Date.now()
    });

    if (!commentId)
      throw new Meteor.Error(500, "Something went wrong, please try again later");

    if (collectionType === 'question')
      Questions.update({ _id: collectionId }, { $addToSet: { comments: commentId } });
    else if (collectionType === 'answer')
      Answers.update({ _id: collectionId }, { $addToSet: { comments: commentId } });

  },

  deleteComment(data) {
    let { collectionName, commentId, parentId } = data;
    let userId = Meteor.userId();

    let comment = Comments.findOne({ _id: commentId });

    let inAllowedRoles = Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]);

    if (!comment)
      throw new Meteor.Error(404, "The comment you are trying to delete is not found");

    if (comment.ownerId !== userId && !inAllowedRoles)
      throw new Meteor.Error(401, "You are not authorized to delete this comment");

    // Remove the comment
    Comments.remove({ _id: commentId });

    // Remove reference from question/answer
    if (collectionName === 'Answers')
      Answers.update({ _id: parentId }, { $pull: { comments: commentId } });
    else if (collectionName === 'Questions')
      Questions.update({ _id: parentId }, { $pull: { comments: commentId } });

  },

  updateComment(data) {
    let { commentId, content } = data;
    let userId = Meteor.userId();
    let inAllowedRoles = Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]);

    let comment = Comments.findOne({ _id: commentId });

    if (!comment)
      throw new Meteor.Error(404, "The comment you are trying to edit is not found");

    if (userId !== comment.ownerId && !inAllowedRoles)
      throw new Meteor.Error(401, "You are not authorized to edit this comment");

    Comments.update({ _id: commentId }, { $set: { content: content } });


  }

});
