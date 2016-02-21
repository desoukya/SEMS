Template.materialGroup.rendered = function() {
  $('.ui.dropdown')
    .dropdown();
};

Template.materialGroup.helpers({
  materialsOfWeek: function(type, value) {
    if (type == "week")
      return Materials.find({
        week: parseInt(value)
      });
    else if (type == "content")
      return Materials.find({
        content: value
      });
    else if (type == "uploadDate")
      return Materials.find({}, {
        sort: {
          date_created: -1
        }
      });
    else
      console.log("can't use that filter");
  },
});