Template.schedule.created = function() {
  this.filterField = new ReactiveVar("week");
};
Template.schedule.onRendered(function() {
  $('.ui.dropdown')
    .dropdown();
});

Template.schedule.events({
  "change #filterBy": function(event, template) {
    var selectValue = template.$("#filterBy").val();

    /////////////// Analytics ///////////////
    analytics.track("Filtering materials", {
      filter: selectValue
    });
    /////////////// Analytics ///////////////


    Template.instance().filterField.set(selectValue);
  },

  'click #add-material': function(event, template) {

    Session.set('selectedMaterialID', "");
  },
});

Template.schedule.helpers({
  filterGroups: function() {
    //TODO : query db to get data
    if (Template.instance().filterField.get() === "week")
      return [{
        value: "1"
      }, {
        value: "2"
      }, {
        value: "3"
      }, {
        value: "4"
      }, {
        value: "5"
      }, {
        value: "6"
      }, {
        value: "7"
      }, {
        value: "8"
      }];
    else if (Template.instance().filterField.get() === "content")
      return [{
        value: "lecture"
      }, {
        value: "assignment"
      }, {
        value: "code"
      }, {
        value: "practiceAssignment"
      }, {
        value: "tutorial"
      }];
    else if (Template.instance().filterField.get() === "uploadDate")
      return [{
        value: "Posting Date"
      }];
    else {
      console.log("error");
    }
  },
  currentFilter: function() {
    return Template.instance().filterField.get();
  },
});
