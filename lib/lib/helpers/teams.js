TeamUtils = {

  // Checking if user is in the given team
  isMember: function(userId, teamId) {
    if (Teams.findOne({
        _id: teamId,
        members: userId
      })) {
      return true;
    } else {
      return false;
    }
  },

  // Check if use is in any team
  isInTeam: function(userId) {
    if (Teams.findOne({
        members: userId
      })) {
      return true;
    } else {
      return false;
    }
  },

  getTeam: function(userId) {
    return Teams.findOne({
      members: userId
    }) || undefined;
  },

}
