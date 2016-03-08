Meteor.startup(function() {
  // Pulling MAIL_URL from settings
  process.env.MAIL_URL = Meteor.settings.MAIL_URL;

  // From (ME !)
  Accounts.emailTemplates.from = Meteor.settings.systemEmail;

  Accounts.emailTemplates.siteName = 'SEMS';

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'SEMS Account Verification';
  };

  // Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };

  // Enable verification after account is created
  Accounts.config({
    sendVerificationEmail: true
  });
});
