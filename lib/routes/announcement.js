Router.route('/announcement/create', {
  name: 'announcement.create',

  waitOn() {
    return [Meteor.subscribe('announcements'),Meteor.subscribe('teams'),Meteor.subscribe('companies')];
  },

  action() {
    this.render('createAnnouncement');
  },

});

Router.route('/teams/:_id/announcements', {
  name: 'team.announcements',
  layoutTemplate: 'teamLayout',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('companies'), Meteor.subscribe('announcements')];
  },

  action() {
    var userId = Meteor.userId();

    var team = Teams.findOne({ _id: this.params._id });

    if (!team)
      this.redirect('team.browse');


    if (TeamUtils.isMember(userId, this.params._id) ||
      Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      this.render('teamAnnouncements');
    } else {
      // If not a member show the about page
      this.redirect('team.about', { _id: this.params._id });
    }
  },

  data() {
    return Teams.findOne({ _id: this.params._id });
  },

});


Router.route('/teams/:_id/milestones', {
  name: 'team.milestones',
  layoutTemplate: 'teamLayout',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('companies'), Meteor.subscribe('milestones')];
  },

  action() {
    var userId = Meteor.userId();

    var team = Teams.findOne({ _id: this.params._id });

    if (!team)
      this.redirect('team.browse');


    if (TeamUtils.isMember(userId, this.params._id) ||
      Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      this.render('teamMilestones');
    } else {
      // If not a member show the about page
      this.redirect('team.about', { _id: this.params._id });
    }
  },

  data() {
    return Teams.findOne({ _id: this.params._id });
  },

});
