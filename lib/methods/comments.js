Meteor.methods({
  addComment(data) {
    let { collectionId, content, collectionType } = data;

    let commentId = Comments.insert({
      ownerId: Meteor.userId(),
      content: content,
      createdAt: Date.now()
    });

    let userId = Meteor.userId();

    if (!commentId)
      throw new Meteor.Error(500, "Something went wrong, please try again later");

    // FIXME: High priority refactoring task
    let hint = "comment : ";
    let icon = "<i class=\"comments icon\"></i>";
    let notificationContent = content.length > 20 ? content.substring(0, 21) + " ..." : content;


    if (collectionType === 'question') {
      Questions.update({ _id: collectionId }, { $addToSet: { comments: commentId } });

      let question = Questions.findOne({ _id: collectionId });
      let comments = question.commentObjects();
      let link = `/discussions/${question._id}`;

      if (question.ownerId !== userId) {
        // Notifying the Question owner
        Notifications.insert({
          ownerId: question.ownerId,
          content: `${icon} ${hint} ${notificationContent}`,
          link: link,
          read: false,
          createdAt: Date.now()
        });
      }

      commenters = comments.map(function(x) {
        return x.ownerId;
      });
      commenters = _.uniq(commenters);
      // Don't notify owner again if he commented
      commenters = _.without(commenters, question.ownerId);

      // Notifying the commenters
      commenters.forEach(function(id) {
        // If it's me don't notify again
        if (id !== userId) {
          Notifications.insert({
            ownerId: id,
            content: `${icon} ${hint} ${notificationContent}`,
            link: link,
            read: false,
            createdAt: Date.now()
          });
        }
      });


    } else if (collectionType === 'answer') {
      Answers.update({ _id: collectionId }, { $addToSet: { comments: commentId } });

      let answer = Answers.findOne({ _id: collectionId });
      let comments = answer.commentObjects();
      // This is bad, we need to pass the question id somehow
      let question = Questions.findOne({ answers: collectionId });
      let link = `/discussions/${question._id}`;

      // Notifying the Question owner
      Notifications.insert({
        ownerId: answer.ownerId,
        content: `${icon} ${hint} ${notificationContent}`,
        link: link,
        read: false,
        createdAt: Date.now()
      });

      commenters = comments.map(function(x) {
        return x.ownerId;
      });
      commenters = _.uniq(commenters);
      // Don't notify owner again if he commented
      commenters = _.without(commenters, question.ownerId);

      // Notifying the commenters
      commenters.forEach(function(id) {
        // If it's me don't notify again
        if (id !== userId) {
          Notifications.insert({
            ownerId: id,
            content: `${icon} ${hint} ${notificationContent}`,
            link: link,
            read: false,
            createdAt: Date.now()
          });
        }
      });

    }


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
