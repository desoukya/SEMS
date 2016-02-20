Template.week.rendered = function() {
  Meteor.subscribe("materials");
};

Template.week.helpers({
  materialsOfWeek: function(weekNumber) {
    return Materials.find();
  },
});