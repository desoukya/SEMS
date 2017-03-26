var Schemas = {};

Schemas.Tag = new SimpleSchema({
    name: {
        type: String,
        label: 'name',
    },
    type: {
        type: String,
        label: 'Type',
        allowedValues: ['Lectures', 'Labs', 'Project', 'Topic'],
    }

});

Tags.attachSchema(Schemas.Tag);
