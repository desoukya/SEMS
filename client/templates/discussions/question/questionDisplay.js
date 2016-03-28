Template.questionDisplay.onRendered(function() {
  $('.small.popup.meta').popup({ inline: true });

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  $('.ui.accordion').accordion();

});

Template.questionDisplay.helpers({
  canEdit() {
    return this.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA]);
  }

});

Template.questionDisplay.events({
  'click #delete-icon': function(event, template) {
    event.preventDefault();
    let self = this;

    $('#delete-question-modal').modal({
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

  'click #edit-icon': function(event, template) {
    event.preventDefault();
    let self = this;

    $('#question-edit-modal').modal({
      onDeny() {

      },
      onApprove() {

        let title = $('input[name=question_title]').val();
        let description = $('textarea[name=question_description]').val();
        let tags = $('#tags').val().split(',').filter(function(tag) {
          return tag.length > 0;
        });
        let questionId = self._id;

        let question = { questionId, title, description, tags };

        Meteor.call('updateQuestion', question, function(err) {
          if (err)
            sAlert.error(err.reason);
        });



      }
    }).modal('show');
  }


});
