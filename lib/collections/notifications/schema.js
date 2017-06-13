var Schemas = {};

Schemas.Notification = new SimpleSchema({
	ownerId: {
		type: String,
		label: 'ownerId',
	},

	content: {
		type: String,
		label: 'content',
	},

	link: {
		type: String,
		label: 'link',
		optional: true
	},

	read: {
		type: Boolean,
		label: 'Read',
	},
	objectId: {
		type: String,
		label: 'objectId'
	},
	parentObjectId: {
		type: String,
		label: 'parentObjectId',
		optional: true
	},

	createdAt: {
		type: String,
		label: 'Creation Date',
	},

});

Notifications.attachSchema(Schemas.Notification);
