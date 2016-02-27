Router.route("/admin", {
  name: "admin.panel",

  action() {
    this.render("adminPanel");
  },

});

Router.route("/admin/users", {
  name: "admin.users",

  waitOn() {
    return Meteor.subscribe("users");
  },

  action() {
    this.render("manageUsers");
  },

});
