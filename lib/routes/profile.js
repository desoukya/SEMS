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
    return [Meteor.subscribe("users", Meteor.userId()), Meteor.subscribe("images")];
  },

  action() {
    this.render('profile');
  },

  data() {
    return Meteor.users.findOne({
      _id: this.params._id
    });
  },

});
