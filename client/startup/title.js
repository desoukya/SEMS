Meteor.startup(function() {
  Tracker.autorun(function() {
    let notifications = Notifications.find({ read: false }).fetch();
    let title = Session.get('title') || 'SEMS';

    if (notifications.length > 0)
      title = `(${notifications.length}) ${title}`;

    document.title = title;
  });
});
