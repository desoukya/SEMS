Template.teamGrades.helpers({
  entries() {
    let res = ReactiveMethod.call('getGrades', this.slug, function(err) {
      if (err)
        sAlert.error(err.reason);
    });

    if (res) {
      // Just for table, getting some space for main points
      res.teamsGrades.criteria.map(function(criterion) {
        return _.extend(criterion, { rowSpan: criterion.checklist.length + 1 });
      });


      // Getting grades into each point of evaluation
      let count = 0;

      res.teamsGrades.criteria.forEach(function(criterion) {
        criterion.checklist.map(function(point) {
          return _.extend(point, { "grade": res.teamsGrades.grades[0].marks[count++] });
        });
      });

    }

    return res;

  }
});
