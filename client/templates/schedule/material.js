Template.material.helpers({
  fileUrl: function(id) {
    try {
      var file = Files.findOne({
        "_id": id
      }).url({
        download: true
      });
      return file;
    } catch (err) {
      //TODO alert can add files
      return " ";
    }
  },
  iconType : function() {
      if(this.content === "lecture")
        return "pdf file outline red ";
      else if(this.content === "assignment")
        return "text file outline green ";
      else if(this.content === "code")
        return "code purple";
      else 
        return "file";

  }
});

Template.material.events({
  "click #delete-icon": function() {
    var self = this;
    $('.ui.material-delete.modal')
      .modal({
        closable: false,
        onDeny: function() {
          //do nothing 
        },
        onApprove: function() {
          if (self.type === "file") {
            // Now delete the old picture
            Files.remove({
              _id: self.identifier
            });
          }
          Materials.remove(self._id);
        }
      })
      .modal('show');
  },
  "click #edit-icon": function() {
    Session.set('selectedMaterialID', this._id);
    //$('.ui.small.modal').modal('show');
  }
});