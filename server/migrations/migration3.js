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