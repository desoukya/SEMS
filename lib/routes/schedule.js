Router.route("/schedule/edit", {
  name: "schedule.edit",

  action: function() {
    this.render("scheduleEditor");
  },

});

Router.route("/schedule", {
  name: "schedule",

  waitOn: function() {
    return [Meteor.subscribe('files'), Meteor.subscribe('materials')];
  },

  action: function() {
    this.render("schedule");
  },

});
