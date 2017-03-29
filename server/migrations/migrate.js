Meteor.startup(function() {
	Migrations.migrateTo('4');
});
