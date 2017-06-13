var Schemas = {};

Schemas.Card = new SimpleSchema({
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
    max: 150,
    min: 0
	},
	teamId: {
		type: String,
		label: 'team ID',
  },
  type: {
		type: String,
		label: 'type',
    allowedValues: ['todo', 'doing', 'done'],
		}

});

Cards.attachSchema(Schemas.Card);
