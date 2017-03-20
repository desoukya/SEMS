Migrations.add({
  version: 4,
  name: 'add subscriptions',
  up :function()
  {
 users = Meteor.users.find({});
    users.forEach(function(user){
    //  console.log(user);
      Meteor.users.update({_id: user._id},{$set: {subscriptions: []}}, false, true)
    });
  },
  down : function(){
//Meteor.users.update({},{$unset:{subscriptions},{multi: true, validate: false});
  }
});
