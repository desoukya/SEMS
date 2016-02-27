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
    var err = false;
    for (var i = 0; i < arr.length; i++) {
      var member = Meteor.users.findOne({
        _id: arr[i],
        roles: "student"
      });
      if (!!member) {
        Teams.update({
          _id: this._id
        }, {
          $push: {
            members: arr[i]
          }
        });
      }
      else 
        err = true;
    if (err)
      console.log("err");
    };
    // clear selected values
    $('.ui.search.dropdown').dropdown("clear");
  },
  "click #changeTeamName": function(event) {
    if ($('#teamName').parent().hasClass('disabled')) {
      $('#teamName').parent().removeClass('disabled')
      $('#changeTeamName').addClass('green')
    } else {
      $('#teamName').parent().addClass('disabled')
      $('#changeTeamName').removeClass('green')
      Teams.update({
        _id: this._id
      }, {
        $set: {
          name: $('#teamName').val()
        }
      });
    }

  },
  "click #changeRepoLink": function(event) {
    if ($('#repoLink').parent().hasClass('disabled')) {
      $('#repoLink').parent().removeClass('disabled');
      $('#changeRepoLink').addClass('green');
    } else {
      $('#repoLink').parent().addClass('disabled');
      $('#changeRepoLink').removeClass('green');
      Teams.update({
        _id: this._id
      }, {
        $set: {
          repo: $('#repoLink').val()
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
  }
});

Template.editableTeamMember.events({
  "click #delete-icon": function() {
    Meteor.call('removeFromAllTeams', this._id)
  },
});