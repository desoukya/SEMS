Template.profileEdit.onRendered(function() {
  Meteor.subscribe("images");

  $('#profile-picture-wrapper').dimmer({
    on: 'hover',
    opacity: 0.7,
  });

  $(".ui.form").form({
    fields: {
      firstname: {
        identifier: 'fname',
        rules: [{
          type: 'empty',
          prompt: 'First Name shouldn\'t be empty'
        }]
      },

      lastname: {
        identifier: 'lname',
        rules: [{
          type: 'empty',
          prompt: 'Last Name shouldn\'t be empty'
        }]
      },

      currentpassword: {
        identifier: 'current_pass',
        rules: [{
          type: 'empty',
          prompt: 'Please the current password'
        }]
      },

      repass: {
        identifier: 'repass',
        optional: true,
        rules: [{
          type: 'match[new_pass]',
          prompt: 'Passwords doesn\'t match'
        }, {
          type: 'length[6]',
          prompt: 'Please enter a password of length greater than 6 characters'
        }]
      },

    }
  });

});

Template.profileEdit.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  },
  image: function() {
    return Images.findOne({
      "_id": Meteor.user().profile.image
    }); // Where Images is an FS.Collection instance
  },
});

Template.profileEdit.events({
  'change #upload-profile-picture': function(event, template) {
    // Get the current image id
    var oldImage = Images.findOne(Meteor.user().profile.image);


    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function(err, fileObj) {
        if (err) {
          // TODO: handle error
          console.log(err);
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "" + fileObj._id
          };
          Meteor.users.update(userId, {
            $set: imagesURL
          });

          if(oldImage){
            // Now delete the old picture
            Images.remove({
              _id: oldImage._id
            });
          }
        }
      });
    });
  },

  "click #upload-dimmer": function(event, template) {
    $("#upload-profile-picture").click();
  },

  "submit .ui.form": function(event, template) {
    event.preventDefault();

    var firstName = event.target.fname.value;
    var lastName = event.target.lname.value;

    var currentPass = event.target.current_pass.value;
    var newPass = event.target.new_pass.value;
    var repeatPass = event.target.repass.value;


    var userData = {
      firstName: firstName,
      lastName: lastName,
      currentPass: currentPass,
    };

    Meteor.call("updateProfile", userData, function(err, result) {
      if (err) {
        // TODO: Display readable error
        console.log(err);
      } else {
        Router.go("/profile" + "/" + Meteor.userId());
      }
    });


    if (newPass.length >= 6) {
      // We need to change the old password
      Accounts.changePassword(currentPass, newPass, function(err) {
        if (err) {
          // TODO: Display readable error
          throw err;
        }
      });
    }



  }

});
