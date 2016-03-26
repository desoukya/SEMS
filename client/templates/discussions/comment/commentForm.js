Template.commentForm.events({
  'click #add-comment-button': function(event, template) {
    event.preventDefault();

    let questionId = this._id;
    let content = $('textarea[name=comment]').val();

    let data = { questionId, content };

    Meteor.call('addComment', data, function(err) {
      if (err)
        sAlert.error(err.reason)
    });


  },

});
