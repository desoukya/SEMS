Template.answer.helpers({
  canEdit() {
    var userId = Meteor.userId();
    return this.ownerId === userId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA]);
  },

  detailedDate() {
    return moment(this.createdAt, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('LLL');
  },

});
