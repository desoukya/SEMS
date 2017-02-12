Meteor.methods({
  LogData: function(data) {
    if (Meteor.settings.DDP_LOGS) {
      console.log(`[LOG][SENT] ==> user: ${this.userId}, action: ${data}`);
    }

    return true;
  }
});
