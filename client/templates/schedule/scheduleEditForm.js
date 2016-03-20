//holds reference to the currunt template
var self = {};

//verification object passed to the semantic ui form for validation
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
  this.materialType = new ReactiveVar('link');
  this.materialFileID = new ReactiveVar('');
};

Template.scheduleEditForm.onRendered(function() {
  Meteor.subscribe('files');

  addBehaviours();
  //store the current template in the local varible "self"
  self = this;
  //reset selected Material to clear any past data
  Session.set('selectedMaterialID', undefined);

  //monitor when the selected material is changed
  Tracker.autorun(function() {
    var materialID = Session.get('selectedMaterialID');
    if (materialID === '') {
      //show new Material form
      $('#schedule-edit-modal').modal('show');
    } else if (materialID !== undefined) {

      //show edit Material form
      var material = Materials.findOne({ _id: materialID });

      if (material) {
        Tracker.nonreactive(function() {
          populateForm(material);
        });

        $('#schedule-edit-modal').modal('show');
      }
    }

  });

});

//populate the form with the material data
function populateForm(material) {

  if (material.type === 'link') {
    $('.checkbox').checkbox('uncheck');
    self.materialType.set('link');
  } else {
    $('.checkbox').checkbox('check');
    self.materialType.set('file');
    self.materialFileID.set(material.identifier);
  }

  $('#title').val(material.title);
  $('#content').dropdown('set selected', material.content);
  $('#week').dropdown('set selected', material.week);
  $('#description').val(material.description);

  //moved this to defer so that it have enough time for the Ui to change
  Meteor.defer(function() {
    if (material.type === 'link') {
      $('#link').val(material.identifier);
    } else {
      $('#fileName').val(Files.findOne({
        _id: material.identifier
      }).original.name);
    }
  });
}

Template.scheduleEditForm.helpers({
  // material type ["file","link"]
  materialType() {
    return Template.instance().materialType.get();
  },

  //current materialFileID  if the material type is file
  //TODO : rename later to material fileID
  materialID() {
    return Template.instance().materialFileID.get();
  },

  //whether this form is used for format or update
  new() {
    if (Session.get('selectedMaterialID') === '' || Session.get('selectedMaterialID') === undefined)
      return true;
    else
      return false;
  },

});

Template.scheduleEditForm.events({
  //uploading files event
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Files.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err);
          // handle error
        } else {
          $('#fileName').val(fileObj.original.name);
          if (template.materialFileID.get() != '') {
            var oldId = template.materialFileID.get();
            template.materialFileID.set(fileObj._id);
            Files.remove({
              _id: oldId
            });
          } else
            template.materialFileID.set(fileObj._id);
        }
      });
    });
  },

  //change material type event
  'change #materialType': function(event) {
    if (event.currentTarget.checked)
      Template.instance().materialType.set('file');
    else
      Template.instance().materialType.set('link');

    Meteor.defer(function() {
      addBehaviours();
    });

  },

  //submit form
  'submit .ui.form': function(event) {
    event.preventDefault();

    var type = $('#materialType').prop("checked");
    var identifier = undefined;

    //true is for upload
    if (type === true)
      identifier = Template.instance().materialFileID.get();
    else if (type === false)
      identifier = $('#link').val();

    var material = {
      identifier: identifier,
      type: type ? 'file' : 'link',
      title: $('#title').val(),
      content: $('#content').val(),
      week: $('#week').val(),
      description: $('#description').val(),
      createdAt: Date.now()
    };

    if (Session.get('selectedMaterialID') === '' || Session.get('selectedMaterialID') === undefined) {
      Materials.insert(material, function(err, data) {
        if (err)
          $('.ui.form').form('add errors', { error: err.reason });
        else {
          $('.ui.form').form('clear');
          setTimeout(function() {
            $('#schedule-edit-modal').modal('hide');
          }, 1000);
          $('.ui.form').addClass('success');
        }

      });

    } else {
      Materials.update(Session.get('selectedMaterialID'), {
        $set: material
      }, function(err, data) {
        if (err)
          $('.ui.form').form('add errors', { error: err });
        else {
          $('.ui.form').form('clear');

          setTimeout(function() {
            $('#schedule-edit-modal').modal('hide');
          }, 1000);

          $('.ui.form').addClass('success');
        }
      });
    }

  },

});


//reset form after UI changes
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
      keyboardShortcuts: false,
      revalidate: false,
      onSuccess: function(event, fields) {
        $('.ui.form').removeClass('success');
      }
    });

  });
}

//clear form data
function clearForm() {
  $('#uploadMaterialForm').form('clear');
  self.materialType.set('link');
  $('#fileName').val('');
  $('#link').val('');
}

function addBehaviours() {
  //TODO : refactor this
  $('#divUpload').on('click', function() {
    $('#upload').trigger('click');
  });

  initForm();

  $('#schedule-edit-modal').modal({
    onHidden: function() {
      Session.set('selectedMaterialID', undefined);
      clearForm();
      initForm();
    },
  });

  $('.ui.dropdown').dropdown();
}
