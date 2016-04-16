// ES6
Meteor.methods({
  createAnnouncement(announcement) {
    // TODO: Check the arguments passed from client - Never Trusted !

    let { title, ownerId, description, global, milestone, teams } = announcement;

    announcement.createdAt = Date.now();

    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      let announcementId = Announcements.insert(announcement);

      if (global) {
        teams = Teams.find({}, { _id: 1 }).fetch().map(function(team) {
          return team._id;
        });
      }

      let typeHint = milestone ? 'Milestone' : 'Announcement';

      // Send system notifications
      teams.forEach(function(teamId) {

        let team = Teams.findOne({ _id: teamId });

        let members = team.members;
        let link = milestone ? `/milestones/${announcementId}` : `/teams/${team.slug}/announcements`;
        let icon = milestone ? '<i class="idea icon"></i>' : '<i class="announcement icon"></i>';

        members.forEach(function(id) {
          Notifications.insert({
            ownerId: id,
            content: `${icon} ${typeHint} : ${title}`,
            link: link,
            read: false,
            createdAt: Date.now()
          });
        });

      });

      let color = milestone ? '#002fbe' : '#fbfa62';
      let { slack } = require('../slack');

      let message = {
        text: `<!everyone> *New ${typeHint} is on the system*`,
        attachments: [{
          fallback: `<!everyone> *New ${typeHint} is on the system*`,
          color: color,
          fields: [{
            title: `${typeHint} : ${title}`,
            value: `Please check the system for new ${typeHint}`,
            short: true
          }]
        }]

      };

      slack.send(message);

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
