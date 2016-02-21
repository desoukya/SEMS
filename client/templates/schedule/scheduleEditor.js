Template.scheduleEditor.created = function() {
  //used reactive var instead of session to not overcroud the session
  //used string type instead of boolean for it to be more readable
  //TODO .. change material type from string to enum .
  this.materialType = new ReactiveVar("link");
  this.materialType.set("link");

  this.materialID = new ReactiveVar("");
  this.materialID.set("");

};

Template.scheduleEditor.rendered = function() {
  Meteor.subscribe("files");
  addBehaviours();
};

Template.scheduleEditor.helpers({
  materialType: function() {
    return Template.instance().materialType.get();
  },
  materialID: function() {
    return Template.instance().materialID.get();
  }
});

Template.scheduleEditor.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Files.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err);
          // handle error
        } else {
          $('#fileName').val(fileObj.original.name);
          template.materialID.set(fileObj._id);
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
  "submit #uploadMaterialForm": function(event) {
    event.preventDefault();
    var type = $('#materialType').prop("checked");
    var identifier = undefined;
    //true is for upload
    if (type === true) {
      identifier = Template.instance().materialID.get()
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

    Materials.insert(material, function(err, data) {
      if (err)
        console.log('error: ' + err);
      else {
        $('.ui.form').form('clear');
        $('uploadMaterialForm').addClass("selected");
        console.log("the material has been uploaded");
      }
    });
  }
});

function addBehaviours() {
  //TODO : refactor this 
  $("#divUpload").on("click", function() {
    $('#upload').trigger('click');
  });
  $('.ui.dropdown')
    .dropdown();
  $('.ui.form').form('destroy');
  $('.ui.form').form({
    fields: {
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
    }
  });
}
