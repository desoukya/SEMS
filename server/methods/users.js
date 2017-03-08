// ES6

Meteor.methods({
  registerUser(userData) {

    // Trimming strings into the given data
    for (key in userData) {
      if (userData.hasOwnProperty(key))
        if (typeof userData.key === 'string')
          userData.key = userData.key.trim();
    }

    let {
      firstName,
      lastName,
      GUCId,
      tutorialGroup,
      mobile,
      githubUser,
      publicEmail,
      email,
      password
    } = userData;

    let profile = { firstName, lastName, GUCId, tutorialGroup, mobile, githubUser };

    if (publicEmail)
      profile.publicEmail = email;

    let userId = Accounts.createUser({
      email: email,
      password: password,
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
    if (!UserUtils.isLoggedIn)
      throw new Meteor.Error(401, "Not authorized, please login first");

    let user = Meteor.user();
    let profile = user.profile;

    let {
      currentPass,
      firstName,
      lastName,
      GUCId,
      tutorialGroup,
      mobile,
      githubUser,
      publicEmail
    } = userData;

    let digest = Package.sha.SHA256(currentPass);
    check(digest, String);

    let password = {
      digest: digest,
      algorithm: 'sha-256'
    };

    let result = Accounts._checkPassword(user, password);

    if (result.error)
      throw result.error;

    // Password update is handled on client
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.GUCId = GUCId;
    profile.tutorialGroup = tutorialGroup;
    profile.mobile = mobile;
    profile.githubUser = githubUser;

    // Add public email if it's public
    if (publicEmail)
      profile.publicEmail = Meteor.user().emails[0].address;

    Meteor.users.update(user._id, { $set: { profile: profile } });

    // Delete public email if it's private
    if (!userData.publicEmail) {
      Meteor.users.update({ _id: Meteor.userId() }, {
        $unset: {
          'profile.publicEmail': ''
        }
      });
    }

  },

  resendVerification(userId) {
    if (Meteor.userId() === userId) {
      Accounts.sendVerificationEmail(userId);
    }
  },

  removeUser(userId) {
    //TODO: Remove questions and answers by user

    if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
      // Remove user from any team
      Teams.update({ members: userId }, { $pull: { members: userId } });

      // Remove the user
      Meteor.users.remove({ _id: userId });
    } else
      throw new Meteor.Error(401, "Can't perform this action");

  },
  updateSubscriptions(subs)
  {
    if (!UserUtils.isLoggedIn)
      throw new Meteor.Error(401, "Not authorized, please login first");

    let user = Meteor.user();
    Meteor.users.update(user._id, { $set: { subscriptions: subs } });

  }

});
