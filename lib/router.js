Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  name: 'home'
});

Router.route("/profile", {
  name: "user.profile",
  waitOn: function() {
    //return Meteor.subscribe(‘images’)
  },
  action: function() {
    if (this.ready())
      this.render('profile');
    else
      this.render('loading');
  },
  data: function() {
    return Meteor.userId() && Meteor.user() && Meteor.user().profile;
  }
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
    //not sure if this is correct
    Meteor.subscribe('materials');
    return Meteor.subscribe('files');
  },
  action: function() {
    this.render("schedule");
  }
});

Router.route("/admin/users", {
  name: "admin.users",
  action: function() {
    this.render("manageUsers");
  }
});

Router.onBeforeAction(function() {
  if (Meteor.user() && Meteor.userId()) {
    this.next();
  } else {
    this.redirect('user.login');
  }
}, {
  //TODO : remove schedule edit
  except: ['user.login', 'user.register', "schedule", 'home', 'schedule.edit']
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
  only: ['admin.panel', 'admin.users']
});
