// ES6
Template.team.helpers({
  teamName() {
    return this.name;
  },

  teamImage() {
    var self = this;
    var imageName = Companies.findOne({
      _id: self.company
    }).image;
    return `/images/teams/${imageName}`;
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
  },

  companyName() {
    var self = this;

    return Companies.findOne({
      _id: self.company
    }).name;
  },

});
Template.team.events({
  "click #addMembers": function(event) {
    var arr = $('#members').val().split(",").filter(function(idString) {
      return idString.length > 0;
    });
    var err = false;
    for (var i = 0; i < arr.length; i++) {
      //check he is not in another team
      var member = Meteor.users.findOne({
        _id: arr[i],
        roles: "student",
      });
      var inTeam = false;
      if (Teams.findOne({
          members: arr[i]
        })) {
        inTeam = true;
      }
      if (!!member && !inTeam) {
        Teams.update({
          _id: this._id
        }, {
          $push: {
            members: arr[i]
          }
        });
      } else
        err = true;
      if (err)
        sAlert.error("you can't add this member ..");
    };
    // clear selected values
    $('.ui.search.dropdown').dropdown("clear");
  },
  "click #changeTeamName": function(event) {
    if ($('#teamName').parent().hasClass('disabled')) {
      $('#teamName').parent().removeClass('disabled');
      $('#changeTeamName').addClass('green');
    } else {
      Teams.update({
        _id: this._id
      }, {
        $set: {
          name: $('#teamName').val()
        }
      }, function(err) {
        if (err)
          sAlert.error("can't update this name");
        else {
          $('#teamName').parent().addClass('disabled');
          $('#changeTeamName').removeClass('green');
        }
      });
    }

  },
  "click #changeRepoLink": function(event) {
    if ($('#repoLink').parent().hasClass('disabled')) {
      $('#repoLink').parent().removeClass('disabled');
      $('#changeRepoLink').addClass('green');
    } else {

      Teams.update({
        _id: this._id
      }, {
        $set: {
          repo: $('#repoLink').val()
        }
      }, function(err) {
        if (err)
          sAlert.error("can't update this repo Name , please provide a valid URL");
        else {
          $('#repoLink').parent().addClass('disabled');
          $('#changeRepoLink').removeClass('green');
        }
      });
    }

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
  },

  isScrum() {
    return Roles.userIsInRole(this, 'scrum-master');
  },
});

Template.editableTeamMember.events({
  "click #delete-icon": function(event, template) {
    var self = this;
    $(event.target).closest(".item").fadeOut(350, function() {
      Meteor.call('removeFromAllTeams', self._id);
    });
  },
});
