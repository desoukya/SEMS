// ES6
Template.header.onRendered(function() {

	Meteor.subscribe('teams');

	Meteor.call('getNodeEnv', function(err, env) {
		if(env === 'development') {
			$('.ui.large.top.hidden.menu').addClass('teal inverted');
		}
	});

});

Template.header.helpers({
	getPendingSurvey() {
		var cuser = Meteor.user();
		if(cuser && Roles.userIsInRole(Meteor.userId(), [STUDENT, SCRUM])) {
			return cuser.pendingSurvey;
		} else {
			return false;
		}
	},

		isInTeam1() {
			//console.log(TeamUtils.isInTeam(Meteor.userId()));
			return TeamUtils.isInTeam(Meteor.userId());
		},


});
