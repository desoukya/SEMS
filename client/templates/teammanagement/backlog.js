import { Template } from 'meteor/templating';

//import './backlog.html';

	//$('.ui.accordion').accordion();


  Template.rating.onRendered(function() {
  var self = this;
  // Initialize rating control
  $('.ui.rating')
    .rating('disable');
});


  Template.storyform.helpers({

    teamMembersAvailable() {
    //  console.log("test2");
      var team = Teams.findOne({ members: Meteor.userId() });
      var teamMembers = [];
    //  Session.set('teamid', team._id);
      for (var i = 0; i < team.members.length; i++) {
        //  if (team.members[i] != Meteor.userId()) {
              var member = Meteor.users.findOne({ _id: team.members[i] });
              teamMembers.push(member);
        //  }
      }
      return teamMembers;
      },

  });

  Template.storycards.helpers({

    stories: function() {
      var team = Teams.findOne({ members: Meteor.userId() });
      var teamId1 = team._id;
      //console.log(Stories.find({teamId: teamId1}));
  		return Stories.find({teamId: teamId1});
  	},
    canEdit() {
  		return this.ownerId === Meteor.userId();
  	},



    notapproved(){
    var display =  !this.approved;
      return display;
    },

    notachieved(){
    var display =  !this.achieved;
      return display;
    }


  });

  Template.storycards.events({

    'click #delete-story': function() {
    //  console.log("test");
      Meteor.call('deleteStory', this._id, function(err) {
        if(err)
          sAlert.error(err.reason);
      })

    },

    'click #approve-story': function() {
    //  console.log("test");
      Meteor.call('approveStory', this._id, function(err) {
        if(err)
          sAlert.error(err.reason);
      })
      $('.checkbox').checkbox({
      uncheckable: false
    });

  },

    'click #achieve-story': function() {
    //  console.log("test");
      Meteor.call('achieveStory', this._id, function(err) {
        if(err)
          sAlert.error(err.reason);
      })
      $('.checkbox').checkbox({
      uncheckable: false
    });

    }








  });







Template.backlog.events({

  'submit .new-story': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    var description = event.target.description.value;
    var ownerId = event.target.assignee.value;
    var sprint = event.target.sprint.value;
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId = team._id;
    var priority = event.target.priority.value;
    var points = event.target.points.value;
  //  var teamId = this._id;
    var story = {
      title,
      ownerId,
      sprint,
      description,
      teamId,
      priority,
      points
      };

    Meteor.call('createStory', story, function(err) {
      if(err)
        sAlert.error(err.reason);
      else {

        // Clear form
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.assignee.value = "";
        event.target.sprint.value = "";
        event.target.priority.value = "";
        event.target.points.value = "";
        // clear selected values
        $('.ui.dropdown').dropdown('clear');

      }
    });

    animateForm();
  },






'click #toggle-story-form-button': function(event, template) {
  animateForm();
},
});

function animateForm() {
	// Animating Question form on toggle
	$('#add-story-form').transition({
		duration: 500,
		animation: 'slide down'
	});
}
