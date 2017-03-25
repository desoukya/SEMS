Template.profile.helpers({
  isCurrentUser() {
    return Meteor.userId() === this._id;
  },

  email() {
    if (this.emails)
      return this.email();
    else
      return this.profile.publicEmail;

  },

  teamId() {
    var team = TeamUtils.getTeam(this._id);

    if (team) {
      return team._id;
    }
  },

  teamSlug() {
    var team = TeamUtils.getTeam(this._id);

    if (team) {
      return team.slug;
    }
  },

  teamName() {
    var team = TeamUtils.getTeam(this._id);

    if (team) {
      return team.name;
    }
  },
  getAnswers(){
    // if(Meteor.userId()==this._id){
    // return Meteor.user().answers;}
    // else {
    //   var user = Meteor.users.find({_id: this._id}).fetch();
    //   return user[0].answers;
    // }
    //console.log(Meteor.userId())
    var answersCount =  this.allAnswersCount(this._id).answersCount;
    console.log(answersCount)
    return answersCount;
  },
  getBestAnswers(){
    // if(Meteor.userId()==this._id){
    // return Meteor.user().bestAnswers;}
    // else {
    //   var user = Meteor.users.find({_id: this._id}).fetch();
    //
    //   return user[0].bestAnswers;
    // }
    var bestAnswersCount =  this.allAnswersCount(this._id).bestAnswersCount;
    console.log(bestAnswersCount)
    return bestAnswersCount;

  },
  getSubscriptions()
  {

    var array = Meteor.user().subscriptions;
    var length = array.length;
    var tagDeleted = new Array(length);
    //initialze array with false
      for(var i = 0; i<tagDeleted.length; i++)
      {

        tagDeleted[i]=false;
      }
      //check if a subscribed tag is deleted from tags
    for(var i = 0; i<array.length; i++)
    {
      if(!(Tags.findOne({name: array[i]})))

      {
        tagDeleted[i] = true;
      }
    }

    //removing deleted tags of tags collection from subscriptions
    for(var i = 0; i<tagDeleted.length; i++){
      if(tagDeleted[i]==true){
      array.splice(i,1)

      }
    }
Meteor.call('updateSubscriptions', array,Meteor.userId(), function(err){
  if(err) sAlert.error(err.reason);
})
  return Meteor.user().subscriptions;

}


});

Template.profiletag.events({

  'click #deleteTag' : function(event)
  {
    var array =Meteor.user().subscriptions;
    var string = this;

var removed = false;
    for(var i = 0; i<array.length; i++)
    {
      if(array[i]==string)
      {
        array.splice(i,1);
        removed = true
        break;
      }
    }
    //console.log(array)
    //console.log(removed)
    Meteor.call('updateSubscriptions', array,Meteor.userId(), function(err){
      if(err)
      sAlert.error(err.reason);
    })
  //console.log(Meteor.user().subscriptions)

  //console.log(array.indexOf($('#tagName').text()))
  }
})
