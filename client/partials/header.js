// ES6
Template.header.onRendered(function() {

    Meteor.call('getNodeEnv', function(err, env) {
        if (env === 'development') {
            $('.ui.large.top.hidden.menu').addClass('teal inverted');
        }
    });

});

Template.header.helpers({
    getPendingSurvey() {
        var cuser = Meteor.user();
        if (cuser) {
            return cuser.pendingSurvey;
        } else{
        	return false;
        }
    }
});
