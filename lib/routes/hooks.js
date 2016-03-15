Router.onBeforeAction(function() {
  if (UserUtils.isLoggedIn()) {
    if (UserUtils.isVerified()) {
      this.next();
    } else {
      this.render('unverified');
    }
  } else {
    this.redirect('user.login');
  }
}, {
  except: ['user.login', 'user.register', "schedule", 'home', 'account.reset', 'faq', 'contact']
});

Router.onBeforeAction(function() {
  if (Meteor.user() && Meteor.userId()) {
    if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
      this.next();
      return;
    }
  }
  this.render('unauthorized');
}, {
  only: ['admin.panel', 'admin.users', 'schedule.edit', 'announcement.create','announcement.manage']
});
