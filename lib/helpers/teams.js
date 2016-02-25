TeamUtils = {
  isInTeam(teamId) {
    if (Teams.findOne({
        _id: teamId,
        members: Meteor.userId()
      })) {
      return true;
    } else {
      return false;
    }
  },
}
