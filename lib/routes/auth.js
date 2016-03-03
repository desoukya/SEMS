Router.route("/login", {
  name: "user.login",

  action: function() {
    this.render("login");
  },

});

Router.route("/register", {
  name: "user.register",

  action: function() {
    this.render("register");
  },

});

Router.route("/password/reset", {
  name: "account.reset",

  action: function() {
    this.render("resetPassword");
  },

})
