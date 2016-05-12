Template.userSurvey.helpers({
    teamQuestions() {

        Meteor.call('getTeamBasedQuestions', function(err, result) {
            if (err) {
                console.log(err);
            } else {
                Session.set('tq', result);
            }

        });
        return Session.get('tq');
    },

    userQuestions() {

        Meteor.call('getUserBasedQuestions', function(err, result) {
            if (err) {
                console.log(err);
            } else {
                Session.set('uq', result);
            }

        });
        return Session.get('uq');
    },

    scrumQuestions() {

        Meteor.call('getScrumMasterQuestions', function(err, result) {
            if (err) {
                console.log(err);
            } else {
                Session.set('sq', result);
            }

        });
        return Session.get('sq');
    },

    teamMembers() {
        var team = Teams.findOne({ members: Meteor.userId() });
        var teamMembers = [];
        Session.set('teamid', team._id);
        for (var i = 0; i < team.members.length; i++) {
            if (team.members[i] != Meteor.userId()) {
                var member = Meteor.users.findOne({ _id: team.members[i] });
                teamMembers.push(member);
            }
        }
        return teamMembers;

    },

    scrumId() {
        var team = Teams.findOne({ members: Meteor.userId() });
        for (var i = 0; i < team.members.length; i++) {
            if (Roles.userIsInRole(team.members[i], SCRUM)) {
                return team.members[i];
            }
        }
    },

    userQuesId(qid, uid) {
        return qid + "_" + uid;
    }


});

Template.userSurvey.rendered = function() {
    $('.ui.radio.checkbox').checkbox();

};

Template.oneTeamQues.rendered = function() {
    $('.ui.radio.checkbox').checkbox();

};

Template.oneMemberQues.rendered = function() {
    $('.ui.radio.checkbox').checkbox();

};

Template.oneScrumQues.rendered = function() {
    $('.ui.radio.checkbox').checkbox();

};

Template.oneMemberQues.helpers({
    userQuesId(qid, uid) {
        return qid + "_" + uid;
    }

});

Template.oneScrumQues.helpers({
    scrumId() {
        var team = Teams.findOne({ members: Meteor.userId() });
        for (var i = 0; i < team.members.length; i++) {
            if (Roles.userIsInRole(team.members[i], SCRUM)) {
                return team.members[i];
            }
        }
    },
    
    userQuesId(qid, uid) {
        return qid + "_" + uid;
    }
});

Template.userSurvey.events({
    'submit form': function(event) {
        event.preventDefault();
        $('.submit.survey-btn').addClass('loading');
        var teamId = Session.get('teamid');
        var formData = $('form').serializeArray();
        formData.forEach(function(ques) {
            if (ques.name.indexOf('t') == 0) {
                Meteor.call('updateSurveyTeam', teamId, ques);
            }

            if (ques.name.indexOf('u') == 0 || ques.name.indexOf('s') == 0) {
                var quesUserId = ques.name.split("_");
                var quesId = quesUserId[0];
                var userId = quesUserId[1];
                Meteor.call('updateSurveyUser', userId, quesId, ques);

            }
        });

        $('.submit.survey-btn').removeClass('loading');
        $('.submit.survey-btn').addClass('disabled');
        $('.positive.message').removeClass('hidden');

        sAlert.success("Thank you for filling the survey!");

        Meteor.users.update({ "_id": Meteor.userId() }, {
            "$set": {
                'pendingSurvey': false
            }
        });

    }
});
