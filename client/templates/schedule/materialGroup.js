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

});
