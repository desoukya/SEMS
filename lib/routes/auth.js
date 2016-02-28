Router.route("/login", {
  name: "user.login",

  action() {
    this.render("login");
  },

});

Router.route("/register", {
  name: "user.register",

  action() {
    this.render("register");
  },

});

Router.route("/password/reset", {
  name: "account.reset",

  action() {
    this.render("resetPassword");
  },

})
