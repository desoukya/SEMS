Template.commentForm.events({
  'click #add-comment-button': function(event, template) {
    event.preventDefault();
    // Fire form submit, to handle front-end validation
    $(template.find('.reply.form')).submit();
  },

  'submit .reply.form': function(event, template) {
    let collectionId = this._id;

    let content = template.find('textarea[name=comment]').value;

    let collectionType = this.collectionType;

    let data = { collectionId, content, collectionType };

    Meteor.call('addComment', data, function(err) {
      if (err)
        sAlert.error(err.reason);
      else
        template.find('textarea[name=comment]').value = '';
    });
  }

});

Template.commentForm.onRendered(function() {
  $('.reply.form')
    .form({
      inline: true,
      fields: {

        comment: {
          identifier: 'comment',
          rules: [{
            type: 'minLength[10]',
            prompt: 'Comment must be at least 10 characters '
          }, {
            type: 'maxLength[700]',
            prompt: 'Comment must be less than 700 characters '
          }]
        },

      }
    });
});
