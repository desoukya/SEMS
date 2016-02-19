Template.scheduleEditor.created = function() {
  //used reactive var instead of session to not overcroud the session
  //used string type instead of boolean for it to be more readable
  //TODO .. change material type from string to enum .
  this.materialType = new ReactiveVar("link");
  this.materialType.set("link");

  this.materialID = new ReactiveVar("2");
  this.materialID.set("2");

};
Template.scheduleEditor.rendered = function() {
  console.log("rendered");
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

          // handle success depending what you need to do
          //TODO : should we add user data id
          /*console.log(fileObj._id);
          console.log(fileObj.original);
          console.log(fileObj.original.name);
          console.log(event.target);
          console.log($('#fileName'));*/
          $('#fileName').val(fileObj.original.name);
          template.materialID.set(fileObj._id);
          console.log(template.materialID.get());
          //TODO : should be replaced with meteor method
          /*Materials.insert(material, function(error, result) {
          if (error) {
          console.log(error.invalidKeys)
          } else
          console.log(result);
          });*/
        }
      });
    });
  },
  "change .materialType": function(event) {
    if (Template.instance().materialType.get() === "link")
      Template.instance().materialType.set("file");
    else
      Template.instance().materialType.set("link");
    Meteor.defer(function(){
      addBehaviours();
    });
  },
  "submit #uploadMaterial": function(event) {
    event.preventDefault();
    var material = {
      fileId: Template.instance().materialID.get(),
      title: $('#title').val(),
      type: $('#type').val(),
      week: $('#week').val(),
      description: $('#description').val(),
      createdAt: new Date() // current time
    };
    console.log(material);
  }
});

function addBehaviours() {
  //TODO : refactor this 
  console.log("reload behaviour");
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