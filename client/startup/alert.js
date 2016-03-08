Meteor.startup(function() {
  sAlert.config({
    position: 'top',
    effect: 'stackslide',
    timeout: 5000,
    stack: true,
    offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
    beep: false,
  });
});
