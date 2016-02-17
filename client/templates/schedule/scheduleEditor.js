Template.scheduleEditor.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Materials.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err);
          // handle error
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "" + fileObj._id
          };
          console.log(imagesURL);
          Meteor.users.update(userId, {
            $set: imagesURL
          });
        }
      });
    });
  },

});