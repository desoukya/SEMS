var Schemas = {};

Schemas.Tag = new SimpleSchema({
	name: {
		type: String,
		label: 'name',
	},
	type: {
		type: String,
		label: 'type',
		allowedValues: ['lecture', 'lab', 'project', 'topic'],
	},
	createdAt: {
		type: String,
		label: 'creation date',
	}

});

Tags.attachSchema(Schemas.Tag);
