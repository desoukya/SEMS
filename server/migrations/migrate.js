	Meteor.startup(function() {
  Migrations.migrateTo('0');
});