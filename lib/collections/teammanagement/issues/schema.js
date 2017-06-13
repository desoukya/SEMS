var Schemas = {};

Schemas.Issue = new SimpleSchema({
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
    max: 300,
    min: 0
	},
	teamId: {
		type: String,
		label: 'team ID',
  },
  story: {
    type: String,
    label: 'story ID',
  },
  comments: {
    type: [String],
    optional: true,
    label: 'comments',
  }

});

Issues.attachSchema(Schemas.Issue);
