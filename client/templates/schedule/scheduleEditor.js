Template.scheduleEditor.created = function() {
  //used reactive var instead of session to not overcroud the session
  //used string type instead of boolean for it to be more readable
  //TODO .. change material type from string to enum . 

  this.materialType = new ReactiveVar("link");
  this.materialType.set("link");
};
Template.scheduleEditor.helpers({
  materialType: function() {
    return Template.instance().materialType.get();
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
          var material = {
            fileId: fileObj._id,
            title: event.target.title.value,
            type: event.target.type.value,
            week: event.target.week.value,
            description: event.target.description.value,
            createdAt: new Date() // current time
          };
          console.log(material);
          //TODO : should be replaced with meteor method
          Materials.insert(material, function(error, result) {
            if (error) {
              console.log(error.invalidKeys)
            } else
              console.log(result);
          });
        }
      });
    });
  },
  "change .materialType": function(event) {
    if (Template.instance().materialType.get() === "link")
      Template.instance().materialType.set("file");
    else
      Template.instance().materialType.set("link");
  }
});