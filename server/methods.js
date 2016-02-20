Meteor.methods({
  registerUser: function(email, password, firstName, lastName) {
    var userId = Accounts.createUser({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName
      },
    });

    if (userId) {
      // Default Role, should be added after a successful creation
      Roles.addUsersToRoles(userId, USER);

      Accounts.sendVerificationEmail(userId);


    }

  },

});
