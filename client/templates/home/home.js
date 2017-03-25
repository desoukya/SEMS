// Meteor.subscribe("leaderboardSortedTeams");
Template.home.helpers({
    isInTeam() {
        return TeamUtils.isInTeam(Meteor.userId());
    },

    getTeamSlug() {
        return TeamUtils.getTeam(Meteor.userId()).slug;
    },

    teams() {
        return Teams.find({}).map(function(item, index) {
            item.number = index + 1;
            return item;
        });
    },
    getFollowedQuestions() {
        Meteor.subscribe('questions');
        //console.log(Questions.find().fetch())
        var array = Meteor.user().questionsFollowed;
        var length = array.length;
        var questionDeleted = new Array(length);
        //initialze array with false
        for (var i = 0; i < questionDeleted.length; i++) {

            questionDeleted[i] = false;
        }
        //check if a subscribed tag is deleted from tags
        for (var i = 0; i < array.length; i++) {

            //  console.log(Questions.find({_id: array[i]}).fetch());
            if (Questions.find({
                    _id: array[i]
                }).fetch().length == 0)

            {
                questionDeleted[i] = true;
            }

        }

        //removing deleted tags of tags collection from subscriptions
        for (var i = 0; i < questionDeleted.length; i++) {
            if (questionDeleted[i] == true) {
                array.splice(i, 1)

            }
        }
        Meteor.call('updateFollowedQuestions', array, Meteor.userId(), function(err) {
            if (err) sAlert.error(err.reason);
        })
        return Meteor.user().questionsFollowed;

    },

    leaderboardSettings() {
        return {
            rowsPerPage: 40,
            showNavigation: 'auto',
            filters: ['myFilter'],
            fields: [{
                key: 'number',
                label: 'Position',
                headerClass: 'leaderboard-head leaderboard-score center aligned',
                tmpl: Template.numberRenderTmpl,
                sortOrder: 1,
                sortDirection: 'ascending'
            }, {
                key: 'name',
                label: 'Name',
                headerClass: 'leaderboard-head center aligned',
                cellClass: 'name-cell center aligned',
                sortable: false
            }, {
                key: 'company.image',
                label: 'Company',
                headerClass: 'leaderboard-head center aligned',
                tmpl: Template.imageRenderTmpl,
                sortable: false
            }, {
                key: 'metrics.dailyPoints',
                label: 'Score',
                headerClass: 'leaderboard-head leaderboard-score center aligned',
                cellClass: 'score-cell center aligned',
                sortOrder: 0,
                sortDirection: 'descending'
            }]
        };
    }
});

Template.numberRenderTmpl.helpers({

    isFirst(number) {
        return number == 1;
    }

});

Template.home.events({
    'click .table tbody tr': function() {
        var team = this;
        if (this.siteUrl) {
            var win = window.open(this.siteUrl, '_blank');
            win.focus();
        } else {
            sAlert.warning(this.name + " did not add their deployment link or did not deploy yet");
        }
    }
});
