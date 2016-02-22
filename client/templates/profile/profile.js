Template.profile.onRendered(function() {
  Meteor.subscribe("images");

  $('#profile-picture-wrapper').dimmer({
    on: 'hover',
    opacity: 0.7,
  });

});

Template.profile.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  },
  image: function() {
    return Images.findOne({
      "_id": Meteor.user().profile.image
    }); // Where Images is an FS.Collection instance
  },
});

Template.profile.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err);
          // handle error
        } else {
          console.log("fileObj = " + fileObj[0]);
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "" + fileObj._id
          };
          Meteor.users.update(userId, {
            $set: imagesURL
          });
        }
      });
    });
  },

  "click #upload-dimmer": function(event, template) {
    $("#upload-profile-picture").click();
  }

});
