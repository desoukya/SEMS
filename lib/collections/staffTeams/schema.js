var Schemas = {};

Schemas.staffTeam = new SimpleSchema({

	_id: {
		type: String,
		label: 'id',
	},
	name: {
		type: String,
		label: 'team name',
	},
	members: {
		type: [String],
		minCount: 1,
	},

	createdAt: {
		type: String,
		label: 'creation date',
	},
})

StaffTeams.attachSchema(Schemas.staffTeam);
