Template.teamGrades.helpers({
  criteria() {
    let grades = {};

    Meteor.call('getGrades', this.slug, function(err, res) {
      if (err)
        sAlert.error(err.reason);
      else {
        grades = res;
        console.log(grades);
      }
    });


  }
});
