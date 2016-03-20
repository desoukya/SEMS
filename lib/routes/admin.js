Router.route('/admin', {
  name: 'admin.panel',

  action() {
    this.render('adminPanel');
  },

});

Router.route('/users/manage', {
  name: 'users.manage',

  waitOn() {
    return Meteor.subscribe('users');
  },

  action() {
    this.render('manageUsers');
  },

});
