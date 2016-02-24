Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  name: 'home'
});


Router.route("/profile/edit", {
  name: "user.profile.edit",
  waitOn: function() {
    return Meteor.subscribe("images");
  },
  action: function() {
    this.render('profileEdit');
  },
  data: function() {
    return Meteor.userId() && Meteor.user() && Meteor.user().profile;
  },
  loadingTemplate: "loading",
});

Router.route("/team", {
  name: "team",
  waitOn: function() {
    return Meteor.subscribe("teams");
  },
  action: function() {
    if(Teams.findOne({members: Meteor.userId()}))
      this.render('teamPage');
    else
      this.render('teamUnavailable');
  },
  data: function() {
    return Meteor.userId() && Meteor.user() && Meteor.user().profile;
  }
});

Router.route("/team/create", {
  name: "team.create",
  waitOn: function() {
    return Meteor.subscribe("teams");
  },
  action: function() {
    this.render('createTeam');
  }
});
Router.route("/profile/:_id", {
  name: "user.profile",
  waitOn: function() {
    return [Meteor.subscribe("users", Meteor.userId()), Meteor.subscribe("images")];
  },
  action: function() {
    this.render('profile');
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  },
  loadingTemplate: "loading"
});


Router.route("/login", {
  name: "user.login",
  action: function() {
    this.render("login");
  }
});

Router.route("/register", {
  name: "user.register",
  action: function() {
    this.render("register");
  }
});

Router.route("/password/reset", {
  name: "account.reset",
  action: function() {
    this.render("resetPassword");
  }
})

Router.route("/admin", {
  name: "admin.panel",
  action: function() {
    this.render("adminPanel");
  }
});

Router.route("/schedule/edit", {
  name: "schedule.edit",
  action: function() {
    this.render("scheduleEditor");
  },
});

Router.route("/schedule", {
  name: "schedule",
  waitOn: function() {
    return [Meteor.subscribe('files'), Meteor.subscribe('materials')];
  },
  action: function() {
    this.render("schedule");
  },
  loadingTemplate: 'loading',
});

Router.route("/admin/users", {
  name: "admin.users",
  action: function() {
    this.render("manageUsers");
  }
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
  except: ['user.login', 'user.register', "schedule", 'home', 'account.reset']
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
  only: ['admin.panel', 'admin.users', 'schedule.edit']
});