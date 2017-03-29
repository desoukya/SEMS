Meteor.users.allow({
    insert(userId, user) {
        return false;
    },

    update(userId, user) {

        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
            return true;
        } else
            return false;
    },

    remove(userId, user) {
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
            return true;
        } else
            return false;
    }

});
