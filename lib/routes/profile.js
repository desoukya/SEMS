Router.route("/profile/edit", {
  name: "user.profile.edit",

  waitOn() {
    return Meteor.subscribe("images");
  },

  action() {
    this.render('profileEdit');
  },

  data() {
    return Meteor.userId() && Meteor.user() && Meteor.user().profile;
  },

});

Router.route("/profile/:_id", {
  name: "user.profile",

  waitOn() {
    return [Meteor.subscribe("users"), Meteor.subscribe("images"), Meteor.subscribe("teams")];
  },

  action() {
    this.render('profile');
  },

  data() {
    return Meteor.users.findOne({
      _id: this.params._id
    }) || this.redirect("home");
  },

});
