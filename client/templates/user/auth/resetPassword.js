Template.resetPassword.events({
  "click .blue.submit.fluid.button": function(event, template) {
    event.preventDefault();
    var email = template.find("#email").value;
    check(email, String);

    Accounts.forgotPassword({
        email: email
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          //TODO: Display a flash message here
          console.log("Email sent, please check your inbox");
        }
      });
  }
});
