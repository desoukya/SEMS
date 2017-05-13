import { Template } from 'meteor/templating';

Template.progressbar.onRendered(function() {
var self = this;
// Initialize rating control
var achievedPointsVar = 0;
var totalPointsVar = 0;
achievedPointsVar+= achievedPoints();
totalPointsVar+=totalPoints();


$('#bar')
  .progress({
    value: achievedPointsVar,
    total: totalPointsVar,
    label: 'ratio',
    text: {
      active: '{value} of {total} done',
      success: '{value} of {total} done'
    }
  });
});



Template.progress.helpers({
  stories: function() {
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(Stories.find({teamId: teamId1}));
    return Stories.find({teamId: teamId1});
  },
  totalPoints(){
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;

    var stories = Stories.find({teamId: teamId1}).fetch();
    var totalPoints = 0;


    for(var i = 0; i < stories.length; i++){
      totalPoints += parseInt(stories[i].points);

    }

//console.log(totalPoints);
    return totalPoints;

  },

  achievedPoints(){
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;

    var achievedStories = Stories.find({$and:[{teamId: teamId1}, {achieved: true}]}).fetch();
    var achievedPoints = 0;
    for(var i = 0; i < achievedStories.length; i++){
      achievedPoints += parseInt(achievedStories[i].points);

    }
    //console.log(achievedStories.length);

    return achievedPoints;
  }


});

Template.todocards.helpers({
  todocardsdisp: function() {
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(teamId1);
    //console.log(Cards.find({teamId: teamId1}));
    return Cards.find({$and: [{teamId: teamId1} , {type: "todo"}]});
    //Cards.find({$and: [{teamId: teamId1} , {type: "todo"}]});
  },
  canEdit() {
    return this.ownerId === Meteor.userId();
  }

});

Template.doingcards.helpers({
  doingcardsdisp: function() {
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(teamId1);
  //console.log(Cards.find({teamId: teamId1}));
    return Cards.find({$and: [{teamId: teamId1} , {type: "doing"}]});
    //Cards.find({$and: [{teamId: teamId1} , {type: "todo"}]});
  },
  canEdit() {
    return this.ownerId === Meteor.userId();
  }

});

Template.donecards.helpers({
  donecardsdisp: function() {
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;
    //console.log(teamId1);
  //console.log(Cards.find({teamId: teamId1}));
    return Cards.find({$and: [{teamId: teamId1} , {type: "done"}]});
    //Cards.find({$and: [{teamId: teamId1} , {type: "todo"}]});
  },
  canEdit() {
    return this.ownerId === Meteor.userId();
  }

});



Template.progress.events({
  'submit .new-todocard': function(event) {
  //  console.log("test");
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    //console.log("test");
    var description = event.target.description.value;
    var ownerId = Meteor.userId();
  //  console.log(ownerId);
    var team = Teams.findOne({ members: Meteor.userId() });
    //console.log(team);
    var teamId = team._id;
    var type = "todo";
  //  var teamId = this._id;
    var card = {
      title,
      ownerId,
      description,
      teamId,
      type
      };

    Meteor.call('createCard', card, function(err) {
      if(err)
        sAlert.error(err.reason);
      else {

        // Clear form
        event.target.title.value = "";
        event.target.description.value = "";
        // clear selected values
        $('.ui.dropdown').dropdown('clear');

      }
    });

    animateTodoForm();
  },

  'submit .new-doingcard': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    var description = event.target.description.value;
    var ownerId = Meteor.userId();
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId = team._id;
    var type = "doing";
  //  var teamId = this._id;
    var card = {
      title,
      ownerId,
      description,
      teamId,
      type
      };

    Meteor.call('createCard', card, function(err) {
      if(err)
        sAlert.error(err.reason);
      else {

        // Clear form
        event.target.title.value = "";
        event.target.description.value = "";
        // clear selected values
        $('.ui.dropdown').dropdown('clear');

      }
    });

    animateDoingForm();
  },

  'submit .new-donecard': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    var description = event.target.description.value;
    var ownerId = Meteor.userId();
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId = team._id;
    var type = "done";
  //  var teamId = this._id;
    var card = {
      title,
      ownerId,
      description,
      teamId,
      type
      };

    Meteor.call('createCard', card, function(err) {
      if(err)
        sAlert.error(err.reason);
      else {

        // Clear form
        event.target.title.value = "";
        event.target.description.value = "";
        // clear selected values
        $('.ui.dropdown').dropdown('clear');

      }
    });

    animateDoneForm();
  },



  'click #toggle-todocard-form-button': function(event, template) {
    animateTodoForm();
  },

  'click #toggle-doingcard-form-button': function(event, template) {
    animateDoingForm();
  },

  'click #toggle-donecard-form-button': function(event, template) {
    animateDoneForm();
  },

  'click #delete-todocard': function() {
  //  console.log("test");
    Meteor.call('deleteCard', this._id, function(err) {
      if(err)
        sAlert.error(err.reason);
    })
  },

    'click #delete-doingcard': function() {
    //  console.log("test");
      Meteor.call('deleteCard', this._id, function(err) {
        if(err)
          sAlert.error(err.reason);
      })
    },

      'click #delete-donecard': function() {
      //  console.log("test");
        Meteor.call('deleteCard', this._id, function(err) {
          if(err)
            sAlert.error(err.reason);
        })


  }

//});

//Template.todocardform.events({



});

function animateTodoForm() {
	// Animating Question form on toggle
	$('#add-todocard-form').transition({
		duration: 500,
		animation: 'slide down'
	});
}

function animateDoingForm() {
	// Animating Question form on toggle
	$('#add-doingcard-form').transition({
		duration: 500,
		animation: 'slide down'
	});
}

function animateDoneForm() {
	// Animating Question form on toggle
	$('#add-donecard-form').transition({
		duration: 500,
		animation: 'slide down'
	});
}

function totalPoints(){
  var team = Teams.findOne({ members: Meteor.userId() });
  var teamId1 = team._id;

  var stories = Stories.find({teamId: teamId1}).fetch();
  var totalPoints = 0;
  //console.log(stories.length);

  for(var i = 0; i < stories.length; i++){
    totalPoints += parseInt(stories[i].points);

  }
  return totalPoints;
}

  function achievedPoints(){
    var team = Teams.findOne({ members: Meteor.userId() });
    var teamId1 = team._id;

    var achievedStories = Stories.find({$and:[{teamId: teamId1}, {achieved: true}]}).fetch();
    var achievedPoints = 0;
    for(var i = 0; i < achievedStories.length; i++){
      achievedPoints += parseInt(achievedStories[i].points);

    }
    //console.log(achievedStories.length);

    return achievedPoints;
  }
