var Schemas = {};

Schemas.Story = new SimpleSchema({
	title: {
		type: String,
		label: 'title',
	},
  ownerId: {
		type: String,
		label: 'assigned ID',
	},
  sprint: {
		type: String,
		label: 'sprint',
		allowedValues: ['1', '2', '3', '4'],
	},
	description: {
		type: String,
		label: 'description',
    max: 150,
    min: 0
	},
	teamId: {
		type: String,
		label: 'team ID',
		},
	approved: {
		type: Boolean,
		label: 'approved',
		optional: true,
		defaultValue: false
	},
	achieved: {
		type: Boolean,
		label: 'achieved',
		optional: true,
		defaultValue: false
	},
	priority: {
		type: String,
		label: 'priority',
		allowedValues: ['1', '2', '3', '4', '5'],
	},
	points: {
		type: String,
		label: 'points',
		allowedValues: ['1', '2', '3', '4', '5','7','8','9','10'],
	}

});

Stories.attachSchema(Schemas.Story);
