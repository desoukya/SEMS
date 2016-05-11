Meteor.methods({
    getTeamBasedQuestions() {
        return [{
            ques: "I understood my individual tasks during each sprint.",
            id: "t1"
        }, {
            ques: "The overall tasks assigned were distributed across all team members with equally difficulty.",
            id: "t2"
        }, {
            ques: "Our meetings were overall focused and productive.",
            id: "t3"
        }, {
            ques: "When issues arise, we focus on the fixing the problem instead of blaming the person",
            id: "t4"
        }, {
            ques: "We generally aim to exceed the expectation and requirements instead of settling for the bare minimum.",
            id: "t5"
        }, {
            ques: "Despite other course obligations and workloads, each person generally committed to their assigned tasks.",
            id: "t6"
        }, {
            ques: "I’m satisfied with the overall team performance",
            id: "t7"
        }]
    },

    getUserBasedQuestions() {
        return [{
            ques: "This team member communicated well with other team members",
            id: "u1"
        }, {
            ques: "This team member contributed to the overall quality of the work produced",
            id: "u2"
        }, {
            ques: "This team member was a team player and often helped after finishing his/her own tasks.",
            id: "u3"
        }, {
            ques: "This person’s technical skills improved over the course.",
            id: "u4"
        }, {
            ques: "This person’s soft and inter-personal skills improved over the course.",
            id: "u5"
        }, {
            ques: "This person shared knowledge with other team members frequently.",
            id: "u6"
        }, {
            ques: "This person gave a positive vibe and encouraged the team to move forward instead of dragging them down.",
            id: "u7"
        }, {
            ques: "I would work with this team member again if I had the choice.",
            id: "u8"
        }]


    },
    getScrumMasterQuestions() {
        if (!Roles.userIsInRole(Meteor.userId(), SCRUM)) {
            return [{
                ques: "The scrum master communicated well with the team members",
                id: "s1"
            }, {
                ques: "The scrum master handled problems well and resolved conflicts that could have hindered the team performance.",
                id: "s2"
            }, {
                ques: "The scrum master facilitated a fair distribution of tasks",
                id: "s3"
            }, {
                ques: "I am overall pleased with the performance of the scrum master",
                id: "s4"
            }];
        } else {
            return [];
        }

    },

    populateSurvey() {
        Meteor.call('getTeamBasedQuestions').forEach(function(question) {
            Teams.find({}).forEach(function(team) {
                Teams.update(team, {
                    $push: {
                        questions: {
                            id: question.id,
                            value: 0,
                            ques: question.ques
                        }
                    }
                });
            });
        });
        Meteor.call('getUserBasedQuestions').forEach(function(question) {
            Meteor.users.find({}).forEach(function(user) {
                Meteor.users.update(user, {
                    $push: {
                        questions: {
                            id: question.id,
                            value: 0,
                            ques: question.ques
                        }
                    },
                    $set: {
                        pendingSurvey: true
                    }
                });
            });
        });
        Meteor.call('getScrumMasterQuestions').forEach(function(question) {
            Meteor.users.find({}).forEach(function(user) {
                if (Roles.userIsInRole(user._id, [SCRUM])) {
                    Meteor.users.update(user, {
                        $push: {
                            questions: {
                                id: question.id,
                                value: 0,
                                ques: question.ques
                            }
                        }
                    });
                }
            });
        });
        Survey.find({}).forEach(function(s) {
            Survey.update(s, {
                $set: {
                    online: true
                }
            });
        });
        return true;
    },

    removeSurvey() {

        Meteor.users.find({}).forEach(function(user) {
            Meteor.users.update(user, {
                $set: {
                        pendingSurvey: false
                    }
            });
        });
        Survey.find({}).forEach(function(s) {
            Survey.update(s, {
                $set: {
                    online: false
                }
            });
        });
        return true;
    },
    updateSurveyTeam(teamId, ques) {
        Teams.update({ "_id": teamId, "questions.id": ques.name }, {
            "$inc": {
                'questions.$.value': ques.value
            }
        });
    },

    updateSurveyUser(userId, quesId, ques) {
        Meteor.users.update({ "_id": userId, "questions.id": quesId }, {
            "$inc": {
                'questions.$.value': ques.value
            }
        });
    }

})
