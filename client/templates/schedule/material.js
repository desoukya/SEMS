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
  "click #delete-icon": function() {
    Materials.remove(this._id);
  },
  "click #edit-icon": function() {
    Session.set('scheduleEditorFormType', "edit");
    Session.set('selectedMaterialID', this._id);
    $('#uploadMaterialForm').removeClass("success");
    $('.ui.tiny.modal').modal('show');
  }
});