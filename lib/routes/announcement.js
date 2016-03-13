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


Router.route('/milestones/:_id', {
  name: 'team.milestone',
  layoutTemplate: 'teamLayout',

  waitOn() {
    return [Meteor.subscribe('teams'), Meteor.subscribe('companies'), Meteor.subscribe('milestones')];
  },

  action() {
    var userId = Meteor.userId();

    var milestone = Announcements.findOne({ _id: this.params._id });

    if (!milestone) //go Home you are drunk
      this.redirect('home');

    var userTeamId = Teams.findOne({ members: userId })._id;

    if (!userTeamId) //go Home you are a ForEverAlone
      this.redirect('home');    

    console.log(userTeamId);
    console.log(milestone);
    console.log(!milestone.global);
    console.log(!_.contains(milestone.teams,userTeamId));
    
    if(!milestone.global && !_.contains(milestone.teams,userTeamId)){
      this.redirect('home');//go home and stop stalking.
    }
    else{
      this.render('milestone');
    }



    /*if (TeamUtils.isMember(userId, this.params._id) ||
      Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      this.render('teamMilestone');
    } else {
      // If not a member show the about page
      this.redirect('team.about', { _id: this.params._id });
    }*/
  },

  data() {
    return Announcements.findOne({ _id: this.params._id });
  },

});
