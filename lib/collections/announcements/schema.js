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
  descriptions: {
    type: String,
    label: 'descriptions',
  },
  Teams: {
    type: [String],
  },
  createdAt: {
    type: String,
    label: 'creation date',
  }
});

Announcements.attachSchema(Schemas.Announcements);