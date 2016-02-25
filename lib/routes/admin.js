Router.route("/admin", {
  name: "admin.panel",

  action() {
    this.render("adminPanel");
  },

});

Router.route("/admin/users", {
  name: "admin.users",

  waitOn() {
    return Meteor.subscribe("users", Meteor.userId());
  },

  action() {
    this.render("manageUsers");
  },

});
