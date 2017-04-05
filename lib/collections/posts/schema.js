var Schemas = {}

Schemas.Posts = new SimpleSchema({
	_id: {
		type: String,
		label: 'id'
	},
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
Posts.attachSchema(Schemas.Posts);
