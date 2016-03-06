Router.route('/profile/edit', {
  name: 'user.profile.edit',

  waitOn() {
    return Meteor.subscribe('images');
  },

  action() {
    this.render('profileEdit');
  },

  data() {
    return Meteor.userId() && Meteor.user();
  },

});

Router.route('/profile/:_id', {
  name: 'user.profile',

  waitOn() {
    return [Meteor.subscribe('users'), Meteor.subscribe('images'), Meteor.subscribe('teams')];
  },

  action() {
    var user = Meteor.users.findOne({ _id: this.params._id });
    if (!user) {
      this.render('home');
    } else {
      this.render('profile');
    }
  },

  data() {
    return Meteor.users.findOne({ _id: this.params._id });
  },

});
