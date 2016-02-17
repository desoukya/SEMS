var debug = function(event, text) {
  event.preventDefault();
  console.log(text);
}

Template.register.events({
  "submit form": function(event) {

    event.preventDefault();

    var firstName = event.target.firstname.value;
    var lastName = event.target.lastname.value;
    var email = event.target.email.value;
    var password = event.target.pass.value;

    Meteor.call("registerUser", email, password, firstName, lastName, function() {

      Router.go('/');

    });

  },
});


Template.register.rendered = function() {
  $('.ui.form').form({
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
      haltuser: {
        identifier: 'email',
        rules: [{
          type: 'empty',
          prompt: 'Please enter an email address'
        }, {
          type: 'email',
          prompt: 'Please enter your email address'
        }]
      },
      haltpass: {
        identifier: 'pass',
        rules: [{
          type: 'empty',
          prompt: 'Please enter a password'
        }, {
          type: 'length[6]',
          prompt: 'Please enter  a password of length greater than 6 characters'
        }]
      },
      haltpassa: {
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
      terms: {
        identifier: 'terms',
        rules: [{
          type: 'checked',
          prompt: 'You need to agree to our terms'
        }]
      },
    }
  });
  $('.ui.checkbox').checkbox();
};
