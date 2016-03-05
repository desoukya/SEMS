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

    membersInTeams = [].concat.apply([], membersInTeams);

    return Meteor.users.find({
      roles: 'student',
      _id: {
        $nin: membersInTeams
      }
    });

  },

  teamMembers() {
    // TODO: Refactor to methods !
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
  'click #addMembers': function(event) {

    var self = this;

    var arr = $('#members').val().split(',').filter(function(idString) {
      return idString.length > 0;
    });

    for (var i = 0; i < arr.length; i++) {

      Meteor.call('addMemberToTeam', arr[i], self._id, function(err, res) {
        if (err) {
          sAlert.error(err.reason);
        }
      });

    };

    // clear selected values
    $('.ui.search.dropdown').dropdown('clear');
  },

  'click #changeTeamName': function(event) {
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
          sAlert.error('Can\'t update this name');
        else {
          $('#teamName').parent().addClass('disabled');
          $('#changeTeamName').removeClass('green');
        }
      });

    }

  },

  'click #changeRepoLink': function(event) {
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
          sAlert.error('Can\'t update this repo Name , please provide a valid URL');
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
      maxSelections: 8
    });
});

//--------------------------------------------------------------
Template.userChoice.helpers({
  username() {
    return this.profile.firstName + ' ' + this.profile.lastName;
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
    return this.profile.firstName + ' ' + this.profile.lastName;
  },

  tutorialGroup() {
    return this.profile.tutorialGroup;
  },

  isScrum() {
    return Roles.userIsInRole(this, 'scrum-master');
  },

});

Template.editableTeamMember.events({
  'click #delete-icon': function(event, template) {
    var self = this;
    Meteor.call('removeFromAllTeams', self._id);
  },
});