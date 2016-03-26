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

  }
});
