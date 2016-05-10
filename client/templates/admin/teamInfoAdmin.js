Template.teamInfoAdmin.helpers({
    averageQuestionScore(question) {
        var allMembers = getMembers(this);
        var count = 0;
        allMembers.forEach(function(member) {
            if (member) {
                if (!member.pendingSurvey) {
                    count++;
                }
            }
        });
        if (question) {
            if (count == 0) {
                return 0;
            } else {
                return question.value / count;
            }
        }
    },

    members() {
        return getMembers(this);
    },

    getColor(question) {
        var allMembers = getMembers(this);
        var count = 0;
        var rating = 0;
        allMembers.forEach(function(member) {
            if (member) {
                if (!member.pendingSurvey) {
                    count++;
                }
            }
        });
        if (question) {
            if (count != 0) {
                rating = question.value / count;
            }
        }
        if (rating <= 2) {
            return "red";
        } else if (rating >= 4) {
            return "green";
        } else {
            return "yellow";
        }
    }

});

Template.teamInfoAdmin.rendered = function() {
    $('.ques-text').popup();
};

function getMembers(team) {
    var teamMembers = [];
    if (team.members) {
        for (var i = 0; i < team.members.length; i++) {
            var member = Meteor.users.findOne({ _id: team.members[i] });
            teamMembers.push(member);
        }
    }
    return teamMembers;
}
