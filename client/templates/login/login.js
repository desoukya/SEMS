var debug = function(event, text) {
  event.preventDefault();
  console.log(text);
}

Template.login.events({
  "submit .form": function(event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword({
      email: email
    }, password, function(err) {
      if (err)
        console.log(err);
      else {
        Router.go('/');
      }
    });
  },

});

Template.login.rendered = function() {
  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            email: {
              identifier: 'email',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your e-mail'
              }, {
                type: 'email',
                prompt: 'Please enter a valid e-mail'
              }]
            },
            password: {
              identifier: 'password',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your password'
              }, {
                type: 'length[6]',
                prompt: 'Your password must be at least 6 characters'
              }]
            }
          }
        });
    });
};
