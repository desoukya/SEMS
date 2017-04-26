var Schemas = {};

Schemas.NewsFeed = new SimpleSchema({
	feedOwnerId: {
		type: String,
		label: 'feedOwnerId',
	},
	eventOwnerId: {
		type: String,
		label: 'eventOwnerId',
	},
	objectId: {
		type: String,
		label: 'objectId'
	},
	parentObjectId: {
		type: String,
		label: 'parentObjectId'
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
	type: {
		type: String,
		label: 'type',
		allowedValues: ['question', 'announcement', 'bestAnswer', 'follow', 'post']
	},
	tags: {
		type: [String],
		label: 'tags',
		optional: true
	},

	createdAt: {
		type: String,
		label: 'Creation Date',
	},

});

NewsFeed.attachSchema(Schemas.NewsFeed);
