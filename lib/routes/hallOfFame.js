Router.route('/hall-of-fame', {
	name: 'hallOfFame',

	action() {
		Session.set('title', 'Hall Of Fame');

		this.render('hallOfFame');
	},

});
