Router.route('/profile/edit', {
    name: 'user.profile.edit',

    waitOn() {
        return [Meteor.subscribe('questions'), Meteor.subscribe('users'), Meteor.subscribe('tags')];
    },

    action() {
        Session.set('title', 'Your profile');
        this.render('profileEdit');
    },

    data() {
        return Meteor.userId() && Meteor.user();
    },

});

Router.route('/profile/:_id', {
    name: 'user.profile',

    waitOn() {
        return [Meteor.subscribe('answers'), Meteor.subscribe('users'), Meteor.subscribe('teams'), Meteor.subscribe('tags'), Meteor.subscribe('questions')];
    },

    action() {
        var user = Meteor.users.findOne({
            _id: this.params._id
        });
        if (!user) {
            this.render('home');
        } else {
            Session.set('title', `${user.fullName()}`);
            this.render('profile');
        }
    },

    data() {
        return Meteor.users.findOne({
            _id: this.params._id
        });
    },

});
