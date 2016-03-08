Template.resetPassword.events({
  'click .blue.submit.fluid.button': function(event, template) {
    event.preventDefault();

    var email = template.find('#email').value;
    check(email, String);

    Accounts.forgotPassword({ email: email }, function(err) {
      if (err)
        sAlert.error(err.reason);
      else
        sAlert.info('Email sent, Please check your inbox');

    });

  }
});
