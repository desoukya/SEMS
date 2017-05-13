Stories.allow({

    insert() {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM]))
            return true;
    },

    update() {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM])) {
            return true;
        } else
            return false;
    },

    remove(userId) {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM])) {
            return true;
        } else
            return false;
    }

});
