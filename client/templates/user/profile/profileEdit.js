// ES6

Template.profileEdit.onRendered(function() {
  $('#profile-picture-wrapper').dimmer({
    on: 'hover',
    opacity: 0.7,
  });

  $('.ui.form').form({
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

  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
});

Template.profileEdit.helpers({
  isPublic() {
    return !!Meteor.user().profile.publicEmail;
  },

  email() {
    return Meteor.user().email();
  },

});

Template.profileEdit.events({
  'change #upload-profile-picture': function(event, template) {
    // Get the current image id
    var oldImage = Images.findOne(Meteor.user().profile.image);


    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function(err, fileObj) {
        if (err) {
          sAlert.error(err.reason);
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();

          var imagesURL = {
            "profile.image": "" + fileObj._id
          };

          Meteor.users.update(userId, {
            $set: imagesURL
          });

          if (oldImage) {
            // Now delete the old picture
            Images.remove({
              _id: oldImage._id
            });
          }
        }
      });
    });
  },

  'click #upload-dimmer': function(event, template) {
    $('#upload-profile-picture').click();
  },

  'submit .ui.form': function(event, template) {
    event.preventDefault();

    var firstName = event.target.fname.value;
    var lastName = event.target.lname.value;

    var currentPass = event.target.current_pass.value;
    var newPass = event.target.new_pass.value;
    var repeatPass = event.target.repass.value;

    var GUCId = event.target.gucid.value;
    var tutorialGroup = event.target.tutorial_group.value;

    // Optionals
    var mobile = event.target.mobile.value;
    var githubUser = event.target.github_user.value;
    var publicEmail = $(event.target.public_mail).prop('checked');

    var userData = {
      firstName: firstName,
      lastName: lastName,
      currentPass: currentPass,
      GUCId: GUCId,
      tutorialGroup: tutorialGroup,
      mobile: mobile,
      githubUser: githubUser,
      publicEmail: publicEmail,
    };
    Meteor.call('updateProfile', userData, function(err, result) {
      if (err)
        sAlert.error(err.reason);
      else
        Router.go('/profile' + '/' + Meteor.userId());

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
