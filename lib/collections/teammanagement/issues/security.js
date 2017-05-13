Issues.allow({

    insert() {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM, STUDENT]))
            return true;
    },

    update() {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM, STUDENT])) {
            return true;
        } else
            return false;
    },

    remove(userId) {
        if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA, JTA, SCRUM, STUDENT])) {
            return true;
        } else
            return false;
    }

});
