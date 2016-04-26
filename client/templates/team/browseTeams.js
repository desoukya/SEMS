Template.browseTeam.onRendered(function () {
  // Initialize clipboard.js
  let ionicClipboardHandler = new Clipboard('#ionicCopyIcon');

  let self = this;

  ionicClipboardHandler.on('success', function (event) {
    sAlert.success('Ionic id is Copied to clipboard');
  });

});

Template.browseTeam.helpers({
  teams() {
    return Teams.find({}, { sort: { createdAt: 1 } });
  },

});

Template.teamCard.helpers({
  membersCount() {
    return this.members.length;
  },

});
