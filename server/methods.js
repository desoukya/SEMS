// ES6

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
      Roles.addUsersToRoles(userId, STUDENT);

      Accounts.sendVerificationEmail(userId);


    }

  },

  updateProfile(userData) {
    if (UserUtils.isLoggedIn()) {
      var user = Meteor.user();
      var profile = user.profile;

      var digest = Package.sha.SHA256(userData.currentPass);
      check(digest, String);

      var password = {
        digest: digest,
        algorithm: 'sha-256'
      };

      var result = Accounts._checkPassword(user, password);

      if (result.error == null) {
        // Password update is handled on client

        profile.firstName = userData.firstName;
        profile.lastName = userData.lastName;

        Meteor.users.update(user._id, {
          $set: {
            profile: profile
          }
        });


      } else {
        throw result.error;
      }


    }
  },


  resendVerification(userId) {
    Accounts.sendVerificationEmail(userId);
  },



});
