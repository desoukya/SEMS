Router.route('/login', {
  name: 'user.login',

  action() {
    this.render('login');
  },

  onBeforeAction() {
    if (UserUtils.isLoggedIn()) {
      this.redirect('home');
    } else {
      this.next();
    }
  }

});

Router.route('/register', {
  name: 'user.register',

  action() {
    this.render('register');
  },

  onBeforeAction() {
    if (UserUtils.isLoggedIn()) {
      this.redirect('home');
    } else {
      this.next();
    }
  }

});

Router.route('/password/reset', {
  name: 'account.reset',

  action() {
    this.render('resetPassword');
  },

  onBeforeAction() {
    if (UserUtils.isLoggedIn()) {
      this.redirect('home');
    } else {
      this.next();
    }
  }

})
