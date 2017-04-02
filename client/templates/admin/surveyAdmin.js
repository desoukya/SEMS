Template.surveyAdmin.events({
	'click .survey': function() {
		$('button.survey').addClass('loading');
		Meteor.call('populateSurvey', function(error, result) {
			if(result) {
				$('button.survey').removeClass('loading');
			}
		});
	},

	'click .rem-survey': function() {
		$('button.rem-survey').addClass('loading');
		Meteor.call('removeSurvey', function(error, result) {
			if(result) {
				$('button.survey').removeClass('loading');
			}
		});
	}
});

Template.surveyAdmin.helpers({
	teams() {
		return Teams.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},

	onlineSurvey() {
		var survey = Survey.findOne({});
		return survey.online;
	}

});

Template.surveyTeamCard.helpers({
	membersCount() {
		return this.members.length;
	},

	filledCount() {
		var allMembers = getMembers(this);
		var count = 0;
		allMembers.forEach(function(member) {
			if(!member.pendingSurvey) {
				count++;
			}
		});
		return count;
	},

	members() {
		return getMembers(this);
	},


});


function getMembers(team) {
	var teamMembers = [];
	for(var i = 0; i < team.members.length; i++) {
		var member = Meteor.users.findOne({
			_id: team.members[i]
		});
		teamMembers.push(member);
	}
	return teamMembers;
}
