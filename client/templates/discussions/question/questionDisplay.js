Template.questionDisplay.onRendered(function() {
  $('.small.popup.meta').popup({ inline: true });

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

});

Template.questionDisplay.helpers({
  detailedDate() {
    return moment(this.createdAt, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('LLL');
  },

  canEdit() {
    return this.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]);
  }

});

Template.questionDisplay.events({
  'click #delete-icon': function(event, template) {
    event.preventDefault();
    let self = this;

    $('#delete-question-modal').modal({
      closable: false,
      onDeny() {

      },
      onApprove() {

        let questionId = self._id;

        // Delete this bad question and redirect
        Meteor.call('deleteQuestion', questionId, function(err) {
          if (err)
            sAlert.error(err.reason);
          else
            Router.go('discussions');
        });

      }
    }).modal('show');

  },


});
