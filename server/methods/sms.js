Meteor.methods({
  'sendSMS': function (opts) {
    try {
      var result = twilioClient.sendMessage({
        to: opts.to,
        body: opts.message
      });
    } catch (err) {
      throw new Meteor.Error(err);
    }
    return result;
  }
});
