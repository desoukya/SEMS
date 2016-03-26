Template.commentForm.events({
  'click #add-comment-button': function(event, template) {
    event.preventDefault();

    let collectionId = this._id;
    let content = $('textarea[name=comment]').val();

    // Passing collection type to use for Questions or Answers
    // TODO: Can be passed as 2nd parameter better ?
    let collectionType = 'question';

    let data = { collectionId, content, collectionType };

    Meteor.call('addComment', data, function(err) {
      if (err)
        sAlert.error(err.reason)
      else
        $('textarea[name=comment]').val('');
    });


  },

});
