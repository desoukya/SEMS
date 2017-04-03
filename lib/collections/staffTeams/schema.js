var Schemas = {};
Schemas.links = new SimpleSchema({
	title: {
		type: String,
		label: 'title'
	},
	description: {
		type: String,
		label: 'description'
	},
	createdAt: {
		type: String,
		label: 'creation date'
	}
})
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
	links: {
		type: [Schemas.links],
	},

	createdAt: {
		type: String,
		label: 'creation date',
	},
})

StaffTeams.attachSchema(Schemas.staffTeam);
