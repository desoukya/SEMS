Template.material.helpers({
  fileUrl: function(id) {
    return Files.findOne({
      "_id": id
    }).url({
      download: true
    });
  },
});

Template.material.events({
  "click #close-icon": function() {
    Materials.remove(this._id);
  }
});