import { Template } from 'meteor/templating';




Template.issuedisplay.helpers({
  issues(){
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(Stories.find({teamId: teamId1}));

    return Issues.find({teamId: teamId1});
  },

});

Template.issueform.helpers({

  stories(){
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(Stories.find({teamId: teamId1}));
  //  console.log("teststory");
  //  console.log(Stories.find({teamId: teamId1}));
    return Stories.find({teamId: teamId1});
  },


});

Template.issues.events({
  'submit .new-issue': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    var description = event.target.description.value;
    var ownerId = Meteor.userId();
    var story = event.target.story.value;
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId = team._id;
    //  var teamId = this._id;
    var issue = {
      title,
      ownerId,
      description,
      teamId,
      story
      };

    Meteor.call('createIssue', issue, function(err) {
      if(err)
        sAlert.error(err.reason);
      else {

        // Clear form
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.story.value = "";
        // clear selected values
        $('.ui.dropdown').dropdown('clear');

      }
    });

    animateForm();
  },

  'click #toggle-issue-form-button': function(event, template) {
    animateForm();
  },


});

Template.commentIssue.events({
  'submit .reply.form': function(event, template) {
    event.preventDefault();

    let collectionId = this._id;

    let content = template.find('textarea[name=comment]').value;

    let collectionType = 'issue';

    let data = { collectionId, content, collectionType };

    Meteor.call('addComment', data, function(err) {
      if (err)
        sAlert.error(err.reason);
      else
        template.find('textarea[name=comment]').value = '';
    });
  }

});

Template.commentIssue.onRendered(function() {
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

function animateForm() {
	// Animating Question form on toggle

	$('#add-issue-form').transition({
		duration: 500,
		animation: 'slide down'
	});
  }
