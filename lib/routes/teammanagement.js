

Router.route('/team-manage/', {
  name: 'teammanagement',

  action() {
    this.render('calendarteam');
  },



});


Router.route('/team-manage/calendar', {
    name: 'calendarteam',
    layoutTemplate: 'teammanagementLayout',

    action() {
      this.render('calendarteam');
    },

  });

  Router.route('/team-manage/backlog', {
      name: 'backlog',
      layoutTemplate: 'teammanagementLayout',

      waitOn() {
        [Meteor.subscribe('stories'), Meteor.subscribe('teams'), Meteor.subscribe('users')]
      },

      action() {
      //  console.log("test");
        this.render('backlog');
      },

    });

    Router.route('/team-manage/progress', {
        name: 'progress',
        layoutTemplate: 'teammanagementLayout',

        waitOn() {
          [Meteor.subscribe('cards'), Meteor.subscribe('stories'), Meteor.subscribe('teams'), Meteor.subscribe('users')]
        },


        action() {
          this.render('progress');
        },

      });

      Router.route('/team-manage/issues', {
          name: 'issues',
          layoutTemplate: 'teammanagementLayout',

          waitOn() {
            [Meteor.subscribe('issues'), Meteor.subscribe('comments'), Meteor.subscribe('stories'), Meteor.subscribe('teams'), Meteor.subscribe('users')]
          },


          action() {
            this.render('issues');
          },

        });
