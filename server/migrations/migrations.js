Migrations.add({
  version: 3,
  name: 'add team slugs',
  up: function() {

  teams = Teams.find({ slug: {$exists: false}})
  teams.forEach(function(team) {
    Teams.update({_id:team._id},{$set:{}},{validate: false})
  });

  },
  down: function() {
    Teams.update({},{$unset:{friendlySlugs:1,slug:1}},{multi:true});
  }
});

Migrations.add({
  version: 2,
  name: 'denormalize company into team',
  up: function() {
    Teams.find().fetch().forEach(function(team) {
    console.log('------------- Migrating team : ' + team.name+ '---------------');
      var newCompany = Companies.findOne({_id:team.company});
      Teams.update({_id:team._id},{$set:{company :newCompany}},{validate: false});
      console.log(team.company + " -> " + (JSON.stringify(newCompany)) );
    console.log('-----------------------------------------------');
    });

  },
  down: function() {
    Teams.find().fetch().forEach(function(team) {
    console.log('------------- Migrating team : ' + team.name+ '---------------');
      var newCompany = team.company._id;
      Teams.update({_id:team._id},{$set:{company :newCompany}},{validate: false});
      console.log((JSON.stringify(team.company)) + " -> " +  team.company._id);
    console.log('-----------------------------------------------');
    });
  }
});

Migrations.add({
  version: 1,
  name: 'change createdAt field to count milli seconds',
  up: function() {

    var collections = [Announcements, Questions, Answers, Teams, Materials];
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
    var collections = [Announcements, Questions, Answers, Teams, Materials];
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
  Migrations.migrateTo('3');
});
