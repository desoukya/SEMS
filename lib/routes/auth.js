Router.route('/login', {
	name: 'user.login',

	action() {
		Session.set('title', 'SEMS | Login');
		this.render('login');
	},

	onBeforeAction() {
		if(UserUtils.isLoggedIn()) {
			this.redirect('home');
		} else {
			this.next();
		}
	}

});

Router.route('/register', {
	name: 'user.register',

	action() {
		Session.set('title', 'SEMS | Register');
		this.render('register');
	},

	onBeforeAction() {
		if(UserUtils.isLoggedIn()) {
			this.redirect('home');
		} else {
			this.next();
		}
	}

});

Router.route('/password/reset', {
	name: 'account.reset',

	action() {
		Session.set('title', 'SEMS | Password reset');
		this.render('resetPassword');
	},

	onBeforeAction() {
		if(UserUtils.isLoggedIn()) {
			this.redirect('home');
		} else {
			this.next();
		}
	}

})
