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
    }
})
