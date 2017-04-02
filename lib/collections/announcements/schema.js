var Schemas = {};

Schemas.Announcements = new SimpleSchema({
	title: {
		type: String,
		label: 'title',
	},
	ownerId: {
		type: String,
		label: 'owner ID',
	},
	description: {
		type: String,
		label: 'description',
	},
	global: {
		type: Boolean,
	},
	milestone: {
		type: Boolean,
	},
	teams: {
		type: [String],
	},
	createdAt: {
		type: String,
		label: 'creation date',
	}
});

Announcements.attachSchema(Schemas.Announcements);
