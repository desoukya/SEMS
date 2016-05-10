Meteor.startup(function() {
  if (Survey.find().count() === 0) {
    // Creating a random password
    var pass = Random.id(20);

    // Creating the great admin
     Survey.insert({online: false});
  }

});