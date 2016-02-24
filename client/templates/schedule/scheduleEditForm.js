var self = {};
var formFieldsVerification = {
  title: {
    identifier: 'title',
    rules: [{
      type: 'empty',
      prompt: 'Please enter the file title'
    }]
  },
  week: {
    identifier: 'week',
    rules: [{
      type: 'empty',
      prompt: 'Please select a week'
    }]
  },
  content: {
    identifier: 'content',
    rules: [{
      type: 'empty',
      prompt: 'Please select the file content'
    }]
  },
  fileIdentifier: {
    identifier: 'identifier',
    rules: [{
      type: 'empty',
      prompt: 'Please upload either a file or a link'
    }]
  },
};
Template.scheduleEditForm.created = function() {
  //used reactive var instead of session to not overcroud the session
  //used string type instead of boolean for it to be more readable
  //TODO .. change material type from string to enum .
  this.materialType = new ReactiveVar("link");
  this.materialFileID = new ReactiveVar("");
};

Template.scheduleEditForm.onRendered(function() {
  Meteor.subscribe("files");
  addBehaviours();
  self = this;
  Session.set('selectedMaterialID', undefined);

  Tracker.autorun(function() {
    var materialID = Session.get('selectedMaterialID');
    if (materialID === "") {
      console.log("newMaterial triggered");
      $('.ui.small.modal').modal('show');
    } else if (materialID !== undefined) {
      console.log("editMaterial triggered.. materialID is : " + materialID);
      var material = Materials.findOne({
        _id: materialID
      })
      if (material) {
        console.log("title : " + material.title);
        Tracker.nonreactive(function() {
          populateForm(self, material);
        });
        $('.ui.small.modal').modal('show');

      } else
        console.log("couldn't find file");
    }
  });
});

function temp(self) {

}

function populateForm(self, material) {

  if (material.type === "link") {
    $('.checkbox').checkbox('uncheck');
    self.materialType.set("link");
  } else {
    $('.checkbox').checkbox('check');
    self.materialType.set("file");
    self.materialFileID.set(material.identifier)
  }

  $('#title').val(material.title);
  $('#content').dropdown('set selected', material.content);
  $('#week').dropdown('set selected', material.week);
  $('#description').val(material.description);

  Meteor.defer(function() {
    if (material.type === "link") {
      $('#link').val(material.identifier);
    } else {
      $('#fileName').val(Files.findOne({
        _id: material.identifier
      }).original.name);
    }
  })
}
Template.scheduleEditForm.helpers({
  materialType: function() {
    return Template.instance().materialType.get();
  },
  materialID: function() {
    return Template.instance().materialFileID.get();
  },
  new: function() {
    if (Session.get('selectedMaterialID') === "" || Session.get('selectedMaterialID') === undefined)
      return true;
    else
      return false;
  }
});


Template.scheduleEditForm.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Files.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err);
          // handle error
        } else {
          $('#fileName').val(fileObj.original.name);
          template.materialFileID.set(fileObj._id);
        }
      });
    });
  },
  "change #materialType": function(event) {
    if (event.currentTarget.checked)
      Template.instance().materialType.set("file");
    else
      Template.instance().materialType.set("link");
    Meteor.defer(function() {
      addBehaviours();
    });
  },
  "submit .ui.form": function(event) {
    event.preventDefault();
    var type = $('#materialType').prop("checked");
    var identifier = undefined;
    //true is for upload
    if (type === true) {
      identifier = Template.instance().materialFileID.get()
    } else if (type === false)
      identifier = $('#link').val();

    var material = {
      identifier: identifier,
      type: type ? 'file' : 'link',
      title: $('#title').val(),
      content: $('#content').val(),
      week: $('#week').val(),
      description: $('#description').val(),
      createdAt: new Date() // current time
    };
    console.log("sending Material :");
    console.log(material);

    if (Session.get('selectedMaterialID') === "" || Session.get('selectedMaterialID') === undefined) {
      Materials.insert(material,
        function(err, data) {
          console.log("action submitted");
          if (err)
            $('.ui.form').form('add errors', {
              error: err
            });
          else {
            console.log("newMaterial submitted");
            setTimeout(function() {
              $('.ui.small.modal').modal('hide');
            }, 1000);
            $('.ui.form').addClass("success");
          }
        });
    } else {
      Materials.update(Session.get('selectedMaterialID'), {
        $set: material
      }, function(err, data) {
        console.log("action submitted");
        if (err)
          $('.ui.form').form('add errors', {
            error: err
          });
        else {
          console.log("editMaterial submitted");
          setTimeout(function() {
            $('.ui.small.modal').modal('hide');
          }, 1000);
          $('.ui.form').addClass("success");
        }
      });
    }
  },
});


function initForm() {
  Meteor.defer(function() {
    // a dirty hack to clear error messages
    $('.ui.form').form({
      fields: {}
    });
    $('.ui.form').form('validate form');
    $('.ui.form').removeClass('success');
    // end of hack
    $('.ui.form').form('destroy');
    $('.ui.form').form({
      fields: formFieldsVerification,
      inline: true,
      keyboardShortcuts:false,
      revalidate: false,
      onSuccess: function(event, fields) {
        console.log("--> on success");
        $('.ui.form').removeClass("success");
      }
    });
  })
}

function clearForm() {
  $('#uploadMaterialForm').form('clear');
  self.materialType.set("link");
  $('#fileName').val("");
  $('#link').val("");
}

function addBehaviours() {
  //TODO : refactor this 
  $("#divUpload").on("click", function() {
    $('#upload').trigger('click');
  });
  initForm();
  $('.ui.small.modal').modal({
    onHidden: function() {
      console.log("------- clear form --------");
      Session.set('selectedMaterialID', undefined);
      clearForm();
      initForm();
      //$('#uploadMaterialForm').removeClass("success");
      //Session.set('scheduleEditFormType', "");
      //resetForm();
    },
  });
  $('.ui.dropdown')
    .dropdown();
}