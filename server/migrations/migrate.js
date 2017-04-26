Meteor.startup(function() {
	Migrations.migrateTo('6');
});
