Router.route('/schedule/edit', {
  name: 'schedule.edit',

  action() {
    this.render('scheduleEditPage');
  },

});

Router.route('/schedule', {
  name: 'schedule',

  waitOn() {
    return [Meteor.subscribe('files'), Meteor.subscribe('materials')];
  },

  action() {
    Session.set('title', 'Schedule');
    this.render('schedule');
  },

});
