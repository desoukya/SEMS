Router.onBeforeAction(function() {
  // Clear title on each route
  Session.set('title', undefined);
  this.next();
});

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
  only: ['admin.panel', 'users.manage', 'schedule.edit', 'announcements.manage', 'github.authenticate', 'survey.admin','admin.teamInfo']
});

Router.onBeforeAction(function() {
  if (Meteor.user() && Meteor.userId()) {
    if (Meteor.users.findOne({_id:Meteor.userId()}).pendingSurvey) {
      this.next();
      return;
    }
  }
  this.render('home');
}, {
  only: ['user.survey']
});

Router.onBeforeAction(function() {
  if (Meteor.user() && Meteor.userId()) {
   Meteor.subscribe('currUser');
   this.next();
  }
},{
  except: ['user.login', 'user.register']
});
