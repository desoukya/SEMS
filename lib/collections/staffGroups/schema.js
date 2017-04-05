var Schemas = {};

Schemas.staffGroup = new SimpleSchema({

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
	posts: {
		type: [String],
		label: 'Posts'
	},

	createdAt: {
		type: String,
		label: 'creation date',
	},
})

StaffGroups.attachSchema(Schemas.staffGroup);
