Meteor.startup(function() {
  if (Survey.find().count() === 0) {

     Survey.insert({online: false});
  }

});
