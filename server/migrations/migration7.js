Migrations.add({
  version: 7,
  name: 'count answers and best answers',
  up :function()
  {
 users = Meteor.users.find({});
    users.forEach(function(user){
    //  console.log(user);
      Meteor.users.update({_id: user._id},{$set: {bestAnswers: 0}}, false, true)
        Meteor.users.update({_id: user._id},{$set: {answers: 0}}, false, true)
    });
  },
  down : function(){
  }
});
