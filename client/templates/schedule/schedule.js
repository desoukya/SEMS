Template.schedule.created = function() {
  this.filterField = new ReactiveVar("week");
};
Template.schedule.rendered = function() {
  $('.ui.dropdown')
    .dropdown();
};  

Template.schedule.events({
  "change #filterBy": function(event, template){
    var selectValue = template.$("#filterBy").val();
    Template.instance().filterField.set(selectValue);
  }
});
Template.schedule.helpers({
  filterGroups: function() {
  	//TODO : query db to get data
    if(Template.instance().filterField.get() === "week")
      return [{value:"1"}, {value:"2"}, {value:"3"}, {value:"4"}];
    else if(Template.instance().filterField.get() === "content")
      return [{value:"lecture"}, {value:"tutorial"}, {value:"practiceAssignment"}] ;
    else if(Template.instance().filterField.get() === "uploadDate")
      return [{value:"Posting Date"}] ;
    else 
    {
      console.log("error");
    }
  },
  currentFilter: function() {
    return Template.instance().filterField.get();
  }
});