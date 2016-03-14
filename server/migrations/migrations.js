Migrations.add({
  version: 1,
  name: 'change createdAt field to count milli seconds',
  up: function() {

    var collections = [Meteor.users, Announcements, Questions, Answers, Teams, Materials];
    collections.forEach(function(collection) {
      console.log('Migrating collection ' + collection._name);

      collection.find().fetch().forEach(function(document) {
        var oldDate = document.createdAt;
        var newDate = Date.parse(oldDate);
        collection.update({_id:document._id},{$set:{createdAt:newDate}},{validate: false});
        console.log(oldDate + " -> " + newDate);
      });
      
      console.log('-----------------------------------------------');
    });
  },
  down: function() {
    var collections = [Meteor.users, Announcements, Questions, Answers, Teams, Materials];
    collections.forEach(function(collection) {
      console.log('Migrating collection ' + collection._name);

      collection.find().fetch().forEach(function(document) {
        var oldDate = document.createdAt;
        var newDate = moment(parseInt(oldDate)).toString();
        collection.update({_id:document._id},{$set:{createdAt:newDate}},{validate: false});
        console.log(oldDate + " -> " + newDate);
      });

      console.log('-----------------------------------------------');
    });
  }
});
//TODO: should be moved later
Meteor.startup(function() {
  Migrations.migrateTo('0');
});