Template.questionDisplay.onRendered(function() {
    $('.small.popup.meta').popup({
        inline: true
    });

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
    $('.ui.accordion').accordion();

});

Template.questionDisplay.helpers({
    isClosed() {
        let question = Questions.findOne({
            _id: this._id
        })
        return question.closed;
    },
    canEdit() {
        return this.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA]);
    },
    canFollow() {
        var userID = Meteor.userId();
        if (userID == this.ownerId)
            return false;
        var user = Meteor.users.findOne({
            _id: userID
        });
        var alreadyFollowing = false;
        for (var i = 0; i < user.questionsFollowed.length; i++) {
            if (user.questionsFollowed[i] == this._id) {
                alreadyFollowing = true;
                break;
            }
        }
        return !(alreadyFollowing);
    },
    canUnfollow() {
        var userID = Meteor.userId();
        if (userID == this.ownerId) return false;
        var user = Meteor.users.findOne({
            _id: userID
        });
        var alreadyFollowing = false;

        for (var i = 0; i < user.questionsFollowed.length; i++) {
            if (user.questionsFollowed[i] == this._id) {
                alreadyFollowing = true;
                break;
            }
        }
        return alreadyFollowing;
    },

    role() {

        var user = Meteor.users.find({
            _id: this.ownerId
        }).fetch();
        return user[0].roles[0];

    }

});

Template.questionDisplay.events({
    'click #delete-icon': function(event, template) {
        event.preventDefault();
        let self = this;


        $('#delete-question-modal').modal({
            onDeny() {

            },
            onApprove() {

                let questionId = self._id;


                // Delete this bad question and redirect
                Meteor.call('deleteQuestion', questionId, function(err) {
                    if (err)
                        sAlert.error(err.reason);
                    else {

                        Router.go('discussions')
                    };
                });

            }
        }).modal('show');
    },

    'click #edit-icon': function(event, template) {
        event.preventDefault();
        let self = this;

        $('#question-edit-modal').modal({
            onDeny() {

            },
            onApprove() {

                let title = $('input[name=question_title]').val();
                let description = $('textarea[name=question_description]').val();
                let tags = $('#tags').val().split(',').filter(function(tag) {
                    return tag.length > 0;
                });
                let questionId = self._id;

                let question = {
                    questionId,
                    title,
                    description,
                    tags
                };

                Meteor.call('updateQuestion', question, function(err) {
                    if (err)
                        sAlert.error(err.reason);
                });



            }
        }).modal('show');
    },
    'click #follow-icon': function(event, template) {
        event.preventDefault();
        var questions = [this._id];
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        });
        var alreadyfollowedQuestions = user.questionsFollowed;


        if (alreadyfollowedQuestions != []) {

            questions = questions.concat(alreadyfollowedQuestions);

        }
        let userId = user._id;
        let followedQuestions = {
            questions,
            userId
        }
        Meteor.call('updateFollowedQuestions', followedQuestions, function(err) {
            if (err)
                sAlert.error(err.reason);
        })
    },

    'click #unfollow-icon': function(event, template) {
        event.preventDefault();
        var question = this._id;
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        });
        var alreadyfollowedQuestions = user.questionsFollowed;
        var index = alreadyfollowedQuestions.indexOf(question);
        if (index != -1) {
            alreadyfollowedQuestions.splice(index, 1);
        }
        let userId = user._id;
        let followedQuestions = {
            questions: alreadyfollowedQuestions,
            userId
        }

        Meteor.call('updateFollowedQuestions', followedQuestions, function(err) {
            if (err) {
                sAlert.error(err.reason)
            }
        })
    }



});
