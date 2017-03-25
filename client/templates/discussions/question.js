Template.question.onRendered(function() {
    this.$('.question-owner-popup-activator').popup({
        popup: this.$('.special.popup'),
        hoverable: true,
        delay: {
            show: 300,
        }
    });
});

Template.question.helpers({

    followed() {
        var question = this._id;
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        })
        var followedquestions = user.questionsFollowed;
        var found = false;
        for (var i = 0; i < followedquestions.length; i++) {
            if (followedquestions[i] == question) {
                found = true;
            }
        }
        if (found == true) {
            return true;
        } else return false;
    },
    role() {
        var question = Questions.find({
            _id: this._id
        }).fetch();
        console.log(question)
        var user = Meteor.users.find({
            _id: question[0].ownerId
        }).fetch();
        console.log(user[0])
        return user[0].roles[0];
    }
})
