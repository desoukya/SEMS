Router.route('/teams/', {
  name: 'team.browse',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('companies')];
  },

  action() {
    this.render('browseTeam');
  },

});

Router.route('/teams/create', {
  name: 'team.create',

  waitOn() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.ready();
    } else {
      return [Meteor.subscribe('teams'), Meteor.subscribe('companies')];
    }
  },

  action() {
    this.render('createTeam');
  },

  onBeforeAction() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.redirect('team.browse');
    } else {
      this.next();
    }
  },

});

Router.route('/teams/:_id/about', {
  name: 'team.about',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('images'), Meteor.subscribe('companies')];
  },

  action() {
    this.render('teamAbout');
  },

  data() {
    return Teams.findOne({
      _id: this.params._id
    }) || this.redirect('team.browse');
  },

});

Router.route('/teams/:_id', {
  name: 'team',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('companies')];
  },

  action() {
    var userId = Meteor.userId();
    if (TeamUtils.isMember(userId, this.params._id) || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      this.render('team');
    } else {
      // If not a member show the about page
      this.redirect('team.about', {
        _id: this.params._id
      });
    }
  },

  data() {
    return Teams.findOne({
      _id: this.params._id
    }) || this.redirect('team.browse');
  },

});
