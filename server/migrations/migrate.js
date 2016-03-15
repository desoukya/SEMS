	Meteor.startup(function() {
  Migrations.migrateTo('3');
});