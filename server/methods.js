Meteor.methods({
  registerUser(userData) {

    var userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: {
        firstName: userData.firstName,
        lastName: userData.lastName
      },
    });

    if (userId) {
      // Default Role, should be added after a successful creation
      Roles.addUsersToRoles(userId, USER);

      Accounts.sendVerificationEmail(userId);


    }

  },

  resendVerification(userId) {
    Accounts.sendVerificationEmail(userId);
  }

});
