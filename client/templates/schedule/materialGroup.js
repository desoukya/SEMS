Template.materialGroup.onRendered(function() {
  $('.ui.dropdown').dropdown();
});

Template.materialGroup.helpers({
  materialsOfWeek(type, value) {
    if (type == 'week')
      return Materials.find({
        week: parseInt(value)
      });
    else if (type == 'content')
      return Materials.find({
        content: value
      });
    else if (type == 'uploadDate')
      return Materials.find({}, { sort: { createdAt: -1 } });
    else
      console.log('Can\'t use that filter');

  },
  weekTitle(value) {
    var weeks = ["Week 1","Week 2","Week 3","Week 4","Week 5","Week6","Midterms","Midterms","Week 8"];
    //arrays are zero indexed ..  weeks are not
    return weeks[value-1];
  }
});
