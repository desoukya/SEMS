var Schemas = {};
Schemas.Posts = new SimpleSchema({
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
	},
	ownerId: {
		type: String,
		label: 'owner Id'
	}
})
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
		type: [Schemas.Posts],
	},

	createdAt: {
		type: String,
		label: 'creation date',
	},
})

StaffGroups.attachSchema(Schemas.staffGroup);
