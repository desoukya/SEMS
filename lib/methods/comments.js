Meteor.methods({
  addComment(data) {
    let { questionId, content } = data;

    let commentId = Comments.insert({
      ownerId: Meteor.userId(),
      content: content,
      createdAt: Date.now()
    });

    if (!commentId)
      throw new Meteor.Error(500, "Something went wrong, please try again later");

    Questions.update({ _id: questionId }, { $addToSet: { comments: commentId } });

  }
});
