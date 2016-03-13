Migrations.add({
  version: 1,
  name: 'change createdAt field to count milli seconds',
  up: function() {

    Questions.find().fetch().forEach(function(question) {
      var oldDate = question.createdAt;
      var newDate = Date.parse(oldDate);
      Questions.update({_id:question._id},{$set:{createdAt:newDate}},{validate: false});
      console.log(oldDate + " -> " + newDate);
    });
  },
  down: function() {
  	Questions.find().fetch().forEach(function(question) {
      var oldDate = question.createdAt;
      var newDate = moment(parseInt(oldDate)).toString();
      Questions.update({_id:question._id},{$set:{createdAt:newDate}},{validate: false});
      console.log(oldDate + " -> " + newDate);
    });
  }
});
//TODO: should be moved later
Meteor.startup(function() {
  Migrations.migrateTo('0');
});