Router.route("/profile/edit", {
  name: "user.profile.edit",

  waitOn: function() {
    return Meteor.subscribe("images");
  },

  action: function() {
    this.render('profileEdit');
  },

  data: function() {
    return Meteor.userId() && Meteor.user() && Meteor.user().profile;
  },

});

Router.route("/profile/:_id", {
  name: "user.profile",

  waitOn: function() {
    return [Meteor.subscribe("users"), Meteor.subscribe("images"), Meteor.subscribe("teams")];
  },

  action: function() {
    var user = Meteor.users.findOne({ _id: this.params._id });
    if (!user) {
      this.render('home');
    } else {
      this.render('profile');
    }
  },

  data: function() {
    return Meteor.users.findOne({ _id: this.params._id });
  },

});
