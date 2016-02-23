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
  var self = this;

  Tracker.autorun(function() {
    var newMaterial = (Session.get('scheduleEditFormType') === "new");

    var material = Materials.findOne({
      _id: Session.get('selectedMaterialID')
    });
    if (!newMaterial) {
      if (material) {
        self.materialType.set(material.type);

        if (material.type === "file") {
          $('.checkbox').checkbox('check');
        } else {
          self.materialFileID.set(material.identifier)
          $('.checkbox').checkbox('uncheck');
        }
        Meteor.defer(function() {
          populateForm(self, material);
        });
      }
    }
    else {
      resetForm()
    }
  });
});
Template.scheduleEditForm.helpers({
  materialType: function() {
    return Template.instance().materialType.get();
  },
  materialID: function() {
    return Template.instance().materialFileID.get();
  },
  new: function() {
    if (Session.get('scheduleEditFormType') === "edit")
      return false;
    else
      return true;
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
    if (Template.instance().materialType.get() === "link")
      Template.instance().materialType.set("file");
    else
      Template.instance().materialType.set("link");
    Meteor.defer(function() {
      addBehaviours();
    });
  },
  "submit .ui.form": function(event) {
    event.preventDefault();
    console.log("submit detected-----------------------------------");
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
    console.log("sending Material :" + material);
    if (Session.get('scheduleEditFormType') === "edit") {
      Materials.update(Session.get('selectedMaterialID'), {
        $set: material
      }, function(err, data) {
        if (err)
          console.log('error: ' + err);
        else {

          resetForm();
          $('.ui.form').form('clear');
          $('.ui.form').addClass("success");
          $('.ui.form>.success>p').text("your action has been confirmed (can be replaced with anything)");
        }
      })
    } else if (Session.get('scheduleEditFormType') === "new") {
      Materials.insert(material,
        function(err, data) {
          if (err)
            console.log('error: ' + err);
          else {
            console.log('adding is successful');
            resetForm();
            $('.ui.form').form('clear');
            $('.ui.form').addClass("success");
            $('.ui.form>.success>p').text("btngan");
            console.log("the material has been uploaded");
          }
        }
      );
    }
  },
});

function populateForm(self, material) {
  if (material.type === "link") {
    $('#link').val(material.identifier);
  } else {
    self.materialFileID.set(material.identifier)
    $('#fileName').val(Files.findOne({
      _id: material.identifier
    }).original.name);
  }

  $('#title').val(material.title);
  $('#content').dropdown('set selected', material.content);
  $('#week').dropdown('set selected', material.week);
  $('#description').val(material.description);
}

function resetForm() {
  $('.ui.form').form('destroy');
  $('.ui.form').form({
    fields: formFieldsVerification,
    inline: true,
    onSuccess: function(event, fields) {
      console.log(fields);
      console.log("from on success function");
      //$('.ui.form').removeClass("success");
      //return true;
    }
  });
}

function addBehaviours() {
  //TODO : refactor this 
  $("#divUpload").on("click", function() {
    $('#upload').trigger('click');
  });
  $('.ui.dropdown')
    .dropdown();
  resetForm();
}