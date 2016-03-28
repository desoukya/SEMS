Template.commentForm.events({
  'click #add-comment-button': function(event, template) {
    event.preventDefault();

    let collectionId = this._id;

    let content = template.find('textarea[name=comment]').value;

    let collectionType = this.collectionType;

    let data = { collectionId, content, collectionType };

    Meteor.call('addComment', data, function(err) {
      if (err)
        sAlert.error(err.reason)
      else
        template.find('textarea[name=comment]').value = '';
    });

  },

});
