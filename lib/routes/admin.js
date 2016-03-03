Router.route("/admin", {
  name: "admin.panel",

  action: function() {
    this.render("adminPanel");
  },

});

Router.route("/admin/users", {
  name: "admin.users",

  waitOn: function() {
    return Meteor.subscribe("users");
  },

  action: function() {
    this.render("manageUsers");
  },

});
