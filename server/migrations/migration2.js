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