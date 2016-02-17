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

Router.route("/login", function() {
  this.render("login")
}, {
  name: "user.login"
});

Router.route("/register", function() {
  this.render("register")
}, {
  name: "user.register"
});

Router.route("/admin", function() {
  this.render("adminPanel");
}, {
  name: "admin.panel",
});

Router.route("/manageusers", function() {
  this.render("manageUsers");
}, {
  name: "admin.manageusers",
});
