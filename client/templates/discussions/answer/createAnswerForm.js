Template.createAnswerForm.helpers({
    questionClosed() {
        let questionId = Template.parentData(1)._id;
        let question = Questions.findOne({
            _id: questionId
        })

        if (question.closed == true) {
            return false;
        }
        return true;
    }
})

Template.createAnswerForm.events({
    'submit #create-answer-form': function(event, template) {
        event.preventDefault();

        var description = event.target.answer.value;
        var answerOwnerID = Meteor.userId();
        var answerOwner = Meteor.users.findOne({
            _id: answerOwnerID
        });
        // Get the question Id from questionPage template
        var questionId = Template.parentData(1)._id;
        let question = Questions.findOne({
            _id: questionId
        })
        let questionOwnerId = question.ownerId;

        let questionOwner = Meteor.users.findOne({
            _id: questionOwnerId
        });
        var questionOwnerEmail = null;
        if (questionOwner.emails == undefined) {
            questionOwnerEmail = Meteor.settings.adminEmail
        } else {

          questionOwnerEmail = questionOwner.emails[0].address
        }

        var answerOwnerName = answerOwner.fullName();

        var answer = {
            description,
            questionId,
            questionOwnerEmail,
            answerOwnerName
        };

        Meteor.call('createAnswer', answer, function(err) {
            if (err)
                sAlert.error(err.reason);
            else
                event.target.answer.value = "";

        });

    },

});
