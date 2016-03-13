Template.answer.onRendered(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

});


Template.answer.helpers({
  canEdit() {
    var userId = Meteor.userId();
    return this.ownerId === userId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA]);
  },

  detailedDate() {
    return moment(this.createdAt, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('LLL');
  },

});


Template.answer.events({
  "click #delete-icon": function(event, template) {
    event.preventDefault();
    let self = this;

    $('#delete-answer-modal').modal({
      closable: true,
      onDeny() {

      },
      onApprove() {

        let answerId = self._id;

        // Delete this bad answer
        Meteor.call('deleteAnswer', answerId, function(err) {
          if (err)
            sAlert.error(err.reason);
        });

      }
    }).modal('show');

  },

});
