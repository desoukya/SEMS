Migrations.add({
  version: 5,
  name: 'add questions followed',
  up :function()
  {
 users = Meteor.users.find({});
    users.forEach(function(user){
      console.log(user);
      Meteor.users.update({_id: user._id},{$set: {questionsFollowed: []}}, false, true)
    });
  },
  down : function(){
//Meteor.users.update({},{$unset:{questionsFollowed},{multi: true, validate: false});
  }
});
