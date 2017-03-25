Router.route('/tags', {
    name: 'tags.edit',

    waitOn() {
        Meteor.subscribe('tags');
    },

    action() {
        Session.set('title', 'SEMS | Admin');
        this.render('tagsEdit');
    },

});
