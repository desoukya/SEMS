// ES6

Meteor.methods({
  registerUser(userData) {

    var profile = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      GUCId: userData.GUCId,
      tutorialGroup: userData.tutorialGroup,
      mobile: userData.mobile,
      githubUser: userData.githubUser,
    };

    if (userData.publicEmail) {
      profile.publicEmail = userData.publicEmail;
    }


    var userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: profile,
    });

    if (userId) {
      // Default Role, should be added after a successful creation
      Roles.addUsersToRoles(userId, STUDENT);

      Accounts.sendVerificationEmail(userId);

      return userId;
    } else
      throw new Meteor.Error(400, 'Can\'t create new user');


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

      } else
        throw result.error;

    }
  },

  resendVerification(userId) {
    Accounts.sendVerificationEmail(userId);
  },

});
