Template.questionDisplay.onRendered(function() {
  $('.small.popup.meta').popup({ inline: true });

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  $('.ui.accordion').accordion();

});

Template.questionDisplay.helpers({
  isClosed(){
    let question = Questions.findOne({_id: this._id})  
    if(question.closed == true)
    { return true;
      }
      else {
        return false;
      }
  },
  canEdit() {
    return this.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA]);
  },
  canFollow()
  {
    var userID = Meteor.userId();
    if(userID == this.ownerId) return false;
    var user = Meteor.users.findOne({_id: userID});
    var followed = false;
    for(var i = 0; i<user.questionsFollowed.length; i++)
    {
      if(user.questionsFollowed[i]==this._id)
      {
        followed = true;
        break;
      }
    }
    if(followed == false){ return true;}
    else {return false;}
  },
  canUnfollow()
  {
    var userID = Meteor.userId();
    if(userID == this.ownerId) return false;
    var user = Meteor.users.findOne({_id: userID});
    var followed = false;
    //console.log(user.questionsFollowed)
    for(var i = 0; i<user.questionsFollowed.length; i++)
    {
      if(user.questionsFollowed[i]==this._id)
      {
        followed = true;
        break;
      }
    }
    if(followed == false){ return false;}
    else {return true;}
  }

});

Template.questionDisplay.events({
  'click #delete-icon': function(event, template) {
    event.preventDefault();
    let self = this;
    //var deleted = false;

    $('#delete-question-modal').modal({
      onDeny() {

      },
      onApprove() {

        let questionId = self._id;


        // Delete this bad question and redirect
        Meteor.call('deleteQuestion', questionId, function(err) {
          if (err)
            sAlert.error(err.reason);
          else{
          //  deleted = true;
            Router.go('discussions')
          };
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
  },
  'click #follow-icon' : function(event, template)
  {
    event.preventDefault();
    var questions = [this._id];
    var user = Meteor.users.findOne({_id: Meteor.userId()});
    var alreadyfollowed = user.questionsFollowed;


    if(alreadyfollowed!=[])
    {
      //console.log("hi");
      questions = questions.concat(alreadyfollowed);


    }
    Meteor.call('updateFollowedQuestions', questions, user._id, function(err)
  {
    if(err)
    sAlert.error(err.reason);
  })
  },

  'click #unfollow-icon' : function(event, template)
  {
    event.preventDefault();
    var question = this._id;
    var user = Meteor.users.findOne({_id: Meteor.userId()});
    var alreadyfollowed = user.questionsFollowed;
    var index = alreadyfollowed.indexOf(question);
    if(index!=-1)
    {
      alreadyfollowed.splice(index, 1);
    }
    //console.log(alreadyfollowed);
    Meteor.call('updateFollowedQuestions', alreadyfollowed,user._id, function(err){
      if(err){
        sAlert.error(err.reason)
      }
    })
  }



});
