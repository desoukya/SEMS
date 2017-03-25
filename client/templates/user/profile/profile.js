Template.profile.helpers({
    isCurrentUser() {
        return Meteor.userId() === this._id;
    },

    email() {
        if (this.emails)
            return this.email();
        else
            return this.profile.publicEmail;

    },

    teamId() {
        var team = TeamUtils.getTeam(this._id);

        if (team) {
            return team._id;
        }
    },

    teamSlug() {
        var team = TeamUtils.getTeam(this._id);

        if (team) {
            return team.slug;
        }
    },

    teamName() {
        var team = TeamUtils.getTeam(this._id);

        if (team) {
            return team.name;
        }
    },
    getAnswers() {

        var answersCount = this.allAnswersCount(this._id).answersCount;

        return answersCount;
    },
    getBestAnswers() {
        var bestAnswersCount = this.allAnswersCount(this._id).bestAnswersCount;
      
        return bestAnswersCount;

    },
    getSubscriptions() {

        var array = Meteor.user().subscriptions;
        var length = array.length;
        var tagDeleted = new Array(length);
        //initialze array with false
        for (var i = 0; i < tagDeleted.length; i++) {

            tagDeleted[i] = false;
        }
        //check if a subscribed tag is deleted from tags
        for (var i = 0; i < array.length; i++) {
            if (!(Tags.findOne({
                    name: array[i]
                })))

            {
                tagDeleted[i] = true;
            }
        }

        //removing deleted tags of tags collection from subscriptions
        for (var i = 0; i < tagDeleted.length; i++) {
            if (tagDeleted[i] == true) {
                array.splice(i, 1)

            }
        }
        Meteor.call('updateSubscriptions', array, Meteor.userId(), function(err) {
            if (err) sAlert.error(err.reason);
        })
        return Meteor.user().subscriptions;

    }


});

Template.profiletag.events({

    'click #deleteTag': function(event) {
        var array = Meteor.user().subscriptions;
        var string = this;

        var removed = false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == string) {
                array.splice(i, 1);
                removed = true
                break;
            }
        }

        Meteor.call('updateSubscriptions', array, Meteor.userId(), function(err) {
            if (err)
                sAlert.error(err.reason);
        })

    }
})
