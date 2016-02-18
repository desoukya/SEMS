Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  name: 'home'
});

Router.route("/profile", {
  name: "profile",
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

Router.route("/admin/users", {
  name: "admin.users",
  action: function() {
    this.render("manageUsers");
  }
});
