// ES6
Meteor.methods({
  createAnnouncement(announcement) {
    // TODO: Check the arguments passed from client - Never Trusted !

    let { title, ownerId, description, global, milestone, teams } = announcement;

    announcement.createdAt = Date.now();

    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      let announcementId = Announcements.insert(announcement);

      if (global)
        teams = Teams.find({}, {
          _id: 1
        }).fetch().map(function(team) {
          return team._id;
        })

      teams.forEach(function(teamId) {

        let team = Teams.findOne({ _id: teamId });

        let members = team.members;
        let link = milestone ? `/milestones/${announcementId}` : `/teams/${team.slug}/announcements`;
        let typeHint = milestone ? 'Milestone :' : 'Announcement :';
        let icon = milestone ? '<i class="idea icon"></i>' : '<i class="announcement icon"></i>';

        members.forEach(function(id) {
          Notifications.insert({
            ownerId: id,
            content: `${icon} ${typeHint} ${title}`,
            link: link,
            read: false,
            createdAt: Date.now()
          });
        });

      });

      return announcementId;
    } else
      throw new Meteor.Error(401, 'Not authorized to create an Announcement');
  },

  updateAnnouncement(data) {
    // TODO: Check the arguments passed from client - Never Trusted !
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return Announcements.update({ _id: data._id }, { $set: data.announcement });
    } else
      throw new Meteor.Error(401, 'Not authorized to edit an Announcement');
  },

});
