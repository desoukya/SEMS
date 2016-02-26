// ES6
Template.team.helpers({
  teamName() {
    return this.name;
  },

  teamImage() {
    return TeamUtils.getDefaultPhoto(this._id);
  },
  members() {
    var membersInTeams = []

    Teams.find().fetch().forEach(function(elem) {
      membersInTeams.push(elem.members);
    });
    membersInTeams = [].concat.apply([], membersInTeams)

    return Meteor.users.find({
      roles: 'student',
      _id: {
        $nin: membersInTeams
      }
    })
  },
  teamMembers() {
    // TODO: Refactor to a methods ! 
    var usersIds = Teams.findOne({
      _id: this._id
    }).members;

    return Meteor.users.find({
      _id: {
        $in: usersIds
      }
    });
  }
});
Template.team.events({
  "click #addMembers": function(event) {
    var arr = $('#members').val().split(",");
    for (var i = 0; i < arr.length; i++) {
      Teams.update({
        _id: this._id
      }, {
        $push: {
          members: arr[i]
        }
      });
    };
    // clear selected values
    $('.ui.search.dropdown').dropdown("clear");
  },
});

Template.team.onRendered(function() {
  $('.ui.search.dropdown')
    .dropdown({
      maxSelections: 3
    });

  /*$('.ui.dropdown')
    .dropdown();*/
});
//--------------------------------------------------------------
Template.userChoice.helpers({
  username() {
    return this.profile.firstName + " " + this.profile.lastName;
  },
});

Template.editableTeamMember.helpers({
  image() {
    var self = this;
    var defaultPictureIndex = UserUtils.getDefaultPictureIndex(self._id);
    return Images.findOne({
      _id: self.profile.image
    }) || {
      url: `/images/default_${defaultPictureIndex}.png`
    };
  },

  fullName() {
    return this.profile.firstName + " " + this.profile.lastName;
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  }
});

Template.editableTeamMember.events({
  "click #delete-icon": function() {
    Meteor.call('removeFromAllTeams',this._id)
  },
});
