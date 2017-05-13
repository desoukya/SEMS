TeamUtils = {

  // Checking if user is in the given team
  isMember(userId, teamId) {
    if (Teams.findOne({
        _id: teamId,
        members: userId
      })) {
      return true;
    } else {
      return false;
    }
  },

  isScrum(userId, teamId) {
    if (Teams.findOne({
      _id: teamId,
      members: userId
    }) && Roles.userIsInRole(userId, SCRUM)) {
      return true;
    } else {
      return false;
    }
  },

  canEditTeam(userId, teamId) {
    if(this.isScrum(userId, teamId) || Roles.userIsInRole(userId, ADMIN)) {
      return true;
    } else {
      return false;
    }
  },

  // Check if user is in any team
  isInTeam(userId) {
    if (Teams.findOne({
        members: userId
      })) {
      return true;
    } else {
      return false;
    }
  },

  getTeam(userId) {
    return Teams.findOne({
      members: userId
    }) || undefined;
  },

}
