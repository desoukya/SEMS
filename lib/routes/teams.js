Router.route("/teams/", {
  name: "team.browse",

  waitOn: function() {
    return [Meteor.subscribe("teams"), Meteor.subscribe("companies")];
  },

  action: function() {
    this.render('browseTeam');
  },

});

Router.route("/teams/create", {
  name: "team.create",

  waitOn: function() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.ready();
    } else {
      return [Meteor.subscribe("teams"), Meteor.subscribe("companies")];
    }
  },

  action: function() {
    this.render('createTeam');
  },

  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.redirect('team.browse');
    } else {
      this.next();
    }
  },

});

Router.route("/teams/:_id/about", {
  name: "team.about",

  waitOn: function() {
    return [Meteor.subscribe("teams"), Meteor.subscribe("users"), Meteor.subscribe("images"), Meteor.subscribe("companies")];
  },

  action: function() {
    this.render('teamAbout');
  },

  data: function() {
    return Teams.findOne({
      _id: this.params._id
    }) || this.redirect("team.browse");
  },

});

Router.route("/teams/:_id", {
  name: "team",

  waitOn: function() {
    return [Meteor.subscribe("teams"), Meteor.subscribe("users"), Meteor.subscribe("companies")];
  },

  action: function() {
    var userId = Meteor.userId();
    if (TeamUtils.isMember(userId, this.params._id) || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
      this.render('team');
    } else {
      // If not a member show the about page
      this.redirect("team.about", {
        _id: this.params._id
      });
    }
  },

  data: function() {
    return Teams.findOne({
      _id: this.params._id
    }) || this.redirect("team.browse");
  },

});
