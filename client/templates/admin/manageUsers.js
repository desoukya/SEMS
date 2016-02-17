Template.manageUsers.helpers({
  users: function() {
    return Meteor.users.find();
  }
});

Template.manageUsers.events({
  "click #update-users-button": function(event, template) {
    var pairs = Session.get("toBeUpdatedRoles");

    for (var id in pairs) {
      if (pairs.hasOwnProperty(id)) {
        Meteor.call("updateRole", id, pairs[id]);
      }
    }

    Session.set("toBeUpdatedRoles", undefined);
  },

});


Template.userEntry.rendered = function() {
  $('.ui.dropdown')
    .dropdown();

  Meteor.subscribe("users", Meteor.userId());
};

Template.userEntry.events({
  "change .ui.selection.dropdown": function(event, template) {
    var id = template.find(".ui.selection.dropdown").id;
    var role = template.find("input[name=role]").value;

    var roles = Session.get("toBeUpdatedRoles");
    if (!roles) {
      roles = {};
    }

    roles[id] = role;

    Session.set("toBeUpdatedRoles", roles);

  },



});

Template.userEntry.helpers({
  username: function() {
    // FIXME: this should be extracted into a method or extended in user object
    var user = Meteor.users.findOne(this._id);
    return user.profile.firstName + " " + user.profile.lastName;
  },

  role: function() {
    // Enforcing one role for user for current setup
    var user = Meteor.users.findOne(this._id);
    return Roles.getRolesForUser(user)[0];
  },

});
