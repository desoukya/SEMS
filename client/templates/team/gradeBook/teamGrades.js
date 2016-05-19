Template.teamGrades.created = function() {
  this.milestone = new ReactiveVar(0);
};
Template.teamGrades.onRendered(function() {
  var self = this;
  $('.ui.dropdown')
    .dropdown({
      onChange(value, text, $choice){
        self.milestone.set(value);
      }});
});

Template.teamGrades.helpers({
  entries() {
    var milestone =  Template.instance().milestone.get();
    let res = ReactiveMethod.call('getGrades', this.slug, milestone, function(err) {
      if (err)
        sAlert.error(err.reason);
    });

    if (res) {

      let marksArray = res.teamsGrades.grades[0].marks;

      // Just for table, getting some space for main points
      res.teamsGrades.criteria.map(function(criterion) {
        return _.extend(criterion, { rowSpan: criterion.checklist.length + 1 });
      });


      // Getting grades into each point of evaluation
      let count = 0;

      res.teamsGrades.criteria.forEach(function(criterion) {
        criterion.checklist.map(function(point) {
          return _.extend(point, { "grade": marksArray[count++] });
        });
      });

      // Individual grade is not available for admins
      res.individualsGrade = "-";
      if (!_.isEmpty(res.individualsGrades))
        res.individualsGrade = res.individualsGrades[0].marks[0].score;


      // Total grade for team
      res.totalGrade = marksArray[marksArray.length - 1].score;
      var maxGrades = [81,165,182]; 
      res.maxGrade = maxGrades[milestone];
    }
    return res;
  }
});