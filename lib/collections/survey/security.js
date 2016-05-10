Survey.allow({
    insert() {
        // Only Scrums can create new teams
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {

            return true;
        }

        return false;
    },
    update() {
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {

            return true;
        }

        return false;

    },
    remove() {
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {

            return true;
        }

        return false;
    }
});
