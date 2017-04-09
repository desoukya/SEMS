Meteor.startup(function() {
	Migrations.migrateTo('5');
});
