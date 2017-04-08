// ES6
Meteor.methods({
	createAnnouncement(announcement) {

		let {
			title,
			ownerId,
			description,
			global,
			milestone,
			teams
		} = announcement;

		announcement.createdAt = Date.now();

		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
			let announcementId = Announcements.insert(announcement);

			if(global) {
				teams = Teams.find({}, {
					_id: 1
				}).fetch().map(function(team) {
					return team._id;
				});
			}

			let typeHint = milestone ? 'Milestone' : 'Announcement';

			// Send system notifications
			teams.forEach(function(teamId) {

				let team = Teams.findOne({
					_id: teamId
				});


				let members = team.members;
				let link;
				if(team.isForStaff) {
					link = milestone ? `/milestones/${announcementId}` : `/staff-groups/${team.slug}/announcements`;
				} else {
					link = milestone ? `/milestones/${announcementId}` : `/teams/${team.slug}/announcements`;
				}
				let icon = milestone ? '<i class="idea icon"></i>' : '<i class="announcement icon"></i>';

				members.forEach(function(id) {
					Notifications.insert({
						ownerId: id,
						content: `${icon} ${typeHint} : ${title}`,
						link: link,
						read: false,
						createdAt: Date.now()
					});
					let member = Meteor.users.findOne({
						_id: id
					})
					let memberemail = member.emails[0].address
					Email.send({
						to: memberemail,
						from: Meteor.settings.systemEmail,
						subject: "[SEMS] Announcements",
						text: `Hello User, there is a new announcement on the system` + "\n" + typeHint + " " + title
					});
				}); //end inner loop

			}); //end loop

			let color = milestone ? '#002fbe' : '#fbfa62';
			let {
				slack
			} = require('../slack');

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

	updateAnnouncement(id, data) {

		let {
			title,
			description,
			global,
			milestone,
			teams
		} = data;


		if(Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {

			Announcements.update({
				_id: id
			}, {
				$set: data
			});

			let typeHint = milestone ? 'Milestone' : 'Announcement';
			let {
				slack
			} = require('../slack');

			let message = {
				text: `<!everyone> *UPDATE :* ${typeHint} is updated on the system`,
				attachments: [{
					fallback: `<!everyone> *UPDATE :* ${typeHint} is updated on the system`,
					color: '#14c8b8',
					fields: [{
						title: `${title} is Updated`,
						value: `Please check the system for updates`,
						short: true
					}]
				}]

			};

			slack.send(message);


		} else
			throw new Meteor.Error(401, 'Not authorized to edit an Announcement');
	},

});
