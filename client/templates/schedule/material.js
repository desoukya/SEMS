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
    var id  = this._id;
    $('.ui.material-delete.modal')
      .modal({
        closable: false,
        onDeny: function() {
          //do nothing 
        },
        onApprove: function() {
          Materials.remove(id);
        }
      })
      .modal('show');
  },
  "click #edit-icon": function() {
    Session.set('scheduleEditFormType', "edit");
    Session.set('selectedMaterialID', "");
    Session.set('selectedMaterialID', this._id);
    $('#uploadMaterialForm').removeClass("success");
    $('.ui.small.modal').modal('show');
  }
});