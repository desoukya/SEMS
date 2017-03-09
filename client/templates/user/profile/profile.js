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
  getSubscriptions()
  {

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
    console.log(array)
    console.log(removed)
    Meteor.call('updateSubscriptions', array, function(err){
      if(err)
      sAlert.error(err.reason);
    })
  //console.log(Meteor.user().subscriptions)

  //console.log(array.indexOf($('#tagName').text()))
  }
})
