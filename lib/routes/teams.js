Router.route("/teams/", {
  name: "team.browse",

  waitOn() {
    return Meteor.subscribe("teams");
  },

  action() {
    this.render('browseTeam');
  },

});

Router.route("/teams/create", {
  name: "team.create",

  waitOn() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.ready();
    } else {
      return Meteor.subscribe("teams");
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

Router.route("/teams/:_id/about", {
  name: "team.about",

  waitOn() {
    return [Meteor.subscribe("teams"), Meteor.subscribe("users"), Meteor.subscribe("images")];
  },

  action() {
    this.render('teamAbout');
  },

  data() {
    return Teams.findOne({
      _id: this.params._id
    });
  },

});

Router.route("/teams/:_id", {
  name: "team",

  waitOn() {
    return [Meteor.subscribe("teams"), Meteor.subscribe("users")];
  },

  action() {
    if (TeamUtils.isMember(Meteor.userId(), this.params._id)) {
      this.render('team');
    } else {
      // If not a member show the about page
      this.redirect("team.about", {
        _id: this.params._id
      });
    }
  },

  data() {
    return Teams.findOne({
      _id: this.params._id
    });
  },

});