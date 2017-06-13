Migrations.add({
	version: 5,
	name: 'add flag to teams schema to indicate it is a staff group or not and add posts',
	up: function() {
		teams = Teams.find({});
		teams.forEach(function(team) {
			Teams.update({
				_id: team._id
			}, {
				$set: {
					isForStaff: false,
					posts: []
				}
			}, false, true)
		});
	},
	down: function() {

	}
});
