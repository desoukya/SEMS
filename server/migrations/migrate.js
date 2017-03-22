Meteor.startup(function() {
  Migrations.migrateTo('7');
});
