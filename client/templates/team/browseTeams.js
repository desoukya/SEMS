let ionicClipboardHandler = {};

Template.browseTeam.onRendered(function() {

	// Don't recreate the clipboard object
	if(!_.isEmpty(ionicClipboardHandler))
		ionicClipboardHandler.destroy();

	// Initialize clipboard.js
	ionicClipboardHandler = new Clipboard('.ionic-copy');

	let self = this;

	ionicClipboardHandler.on('success', function(event) {
		sAlert.success('Ionic id is Copied to clipboard');
	});

});

Template.browseTeam.helpers({
	viewingStaff() {
		var routeName = Router.current().route.getName();
		if(routeName == 'staffGroups.browse') {
			return true;
		}
		return false;
	},
	viewingTeams() {
		var routeName = Router.current().route.getName();
		if(routeName == 'team.browse') {
			return true;
		}
		return false;
	},
	teams() {
		return Teams.find({
			isForStaff: false
		}, {
			sort: {
				createdAt: 1
			}
		});
	},
	staffGroups() {

		return Teams.find({
			"isForStaff": true
		}, {
			sort: {
				createdAt: 1
			}
		}).fetch();
	},

});

Template.teamCard.helpers({
	membersCount() {
		return this.members.length;
	},

});

Template.teamCard.events({
	'click .blue.large.server.link.icon': function() {
		analytics.track('Launch Deployment', {
			teamId: this.slug
		});
	},

	'click #ionicCopyIcon': function() {
		analytics.track('Copy ionic ID', {
			teamId: this.slug
		});
	}
});





Template.staffGroupCard.helpers({
	membersCount() {
		return this.members.length;
	},

});
