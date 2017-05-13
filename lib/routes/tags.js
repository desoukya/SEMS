Router.route('/tags', {
	name: 'tags.edit',

	waitOn() {
		Meteor.subscribe('tagsInfo');
	},

	action() {
		Session.set('title', 'SEMS | Admin');
		this.render('tagsEdit');
	},

});
