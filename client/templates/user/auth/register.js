Template.register.events({
  'submit form': function(event) {

    event.preventDefault();

    var firstName = event.target.firstname.value;
    var lastName = event.target.lastname.value;
    var email = event.target.email.value;
    var password = event.target.pass.value;
    var GUCId = event.target.gucid.value;
    var tutorialGroup = event.target.tutorial_group.value;

    // Optionals
    var mobile = event.target.mobile.value;
    var githubUser = event.target.github_user.value;
    var publicEmail = $(event.target.public_mail).prop('checked');

    if (publicEmail) {
      publicEmail = email;
    }


    var userData = {
      firstName,
      lastName,
      email,
      password,
      GUCId,
      tutorialGroup,
      mobile,
      githubUser,
      publicEmail,
    };

    Meteor.call('registerUser', userData, function(err) {
      if (err)
        sAlert.error(err.reason);
      else
        Router.go('/');

    });

  },

  'click #honor-code-open': function(event, template) {
    event.preventDefault();

    $('#honor-code-modal').modal({
      onDeny() {
        $('#honor-code-checkbox').checkbox('uncheck');
      },
      onApprove() {
        $('#honor-code-checkbox').checkbox('check');
      }
    }).modal('show');
  },

});

Template.register.onRendered(function() {
  $('.ui.form').form({
    inline: true,
    fields: {
      firstname: {
        identifier: 'firstname',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your full name'
        }]
      },

      lastname: {
        identifier: 'lastname',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your full name'
        }]
      },

      user: {
        identifier: 'email',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your GUC email address'
        }, {
          type: 'regExp[/^([a-zA-Z0-9_\.-]+)@(student\.)?guc\.edu\.eg$/]',
          prompt: 'Please enter a Valid GUC Gmail'
        }]
      },

      pass: {
        identifier: 'pass',
        rules: [{
          type: 'empty',
          prompt: 'Please enter a password'
        }, {
          type: 'length[6]',
          prompt: 'Please enter  a password of length greater than 6 characters'
        }]
      },

      repass: {
        identifier: 'repass',
        rules: [{
          type: 'empty',
          prompt: 'Please enter a password'
        }, {
          type: 'length[6]',
          prompt: 'Please enter  a password of length greater than 6 characters'
        }, {
          type: 'match[pass]',
          prompt: 'The passwords should match'
        }]
      },

      gucId: {
        identifier: 'gucid',
        rules: [{
          type: `regExp[${Regex.GUCId}]`,
          prompt: 'Please use a proper GUC ID format'
        }]
      },

      tutorialGroup: {
        identifier: 'tutorial_group',
        rules: [{
          type: 'empty',
          prompt: 'Please select your tutorial group'
        }]
      },

      mobile: {
        identifier: 'mobile',
        optional: true,
        rules: [{
          type: `regExp[${Regex.mobileNumber}]`,
          prompt: 'Mobile number format supported is dddddddddd'
        }]
      },

      github: {
        identifier: 'github_user',
        optional: true,
        rules: [{
          type: `regExp[${Regex.githubUser}]`,
          prompt: 'Please use github username, not a URL nor your fullname'
        }]
      },


      honorCode: {
        identifier: 'terms',
        rules: [{
          type: 'checked',
          prompt: 'You need to agree to the honor code'
        }]
      },
    }
  });

  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').dropdown();
});
