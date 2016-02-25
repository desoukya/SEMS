Router.route("/teams/:_id/about", {
  name: "team.about",
  waitOn() {
    return Meteor.subscribe("teams");
  },

  action() {
    this.render('teamAbout');
  },

  data() {
    return Teams.find({
      _id: this.params._id
    });
  },

});

Router.route("/teams/:_id", {
  name: "team",
  waitOn() {
    return Meteor.subscribe("teams");
  },

  action() {
    if (Teams.findOne({
        members: Meteor.userId()
      })) {
      this.render('team');
    } else {
      // If not a member show the about page
      this.redirect("teams.about", {
        _id: this.params._id
      });
    }
  },

  data() {
    return Teams.find({
      _id: this.params._id
    });
  },

});

Router.route("/teams/create", {
  name: "team.create",
  waitOn: function() {
    return Meteor.subscribe("teams");
  },
  action: function() {
    this.render('createTeam');
  },
  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
      this.redirect('team');
    } else {
      this.next();
    }
  },
});

Router.route("/teams/", {
  name: "team.browse",
  waitOn: function() {
    return Meteor.subscribe("teams");
  },
  action: function() {
    this.render('browseTeam');
  }
});
