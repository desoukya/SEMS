Template.material.helpers({
  fileUrl: function(id) {
    return Files.findOne({
      "_id": id
    }).url({
      download: true
    });
  },
});