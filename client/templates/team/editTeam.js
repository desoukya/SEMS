Template.editTeam.helpers({
  availableMembers() {
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

});

Template.editTeam.events({
  'click #addMembers': function(event) {
    //temp fix
    // return;

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

  'click #changeSiteLink': function(event) {
    if ($('#websiteLink').parent().hasClass('disabled')) {
      $('#websiteLink').parent().removeClass('disabled');
      $('#changeSiteLink').addClass('green');

    } else {
      Teams.update({
        _id: this._id
      }, {
        $set: {
          siteUrl: $('#websiteLink').val()
        }
      }, function(err) {
        if (err)
          sAlert.error('Can\'t update this website link , please provide a valid URL');
        else {
          $('#websiteLink').parent().addClass('disabled');
          $('#changeSiteLink').removeClass('green');
        }
      });

    }

  },

  'click #changeIonicId': function(event) {
    if ($('#ionicId').parent().hasClass('disabled')) {
      $('#ionicId').parent().removeClass('disabled');
      $('#changeIonicId').addClass('green');

    } else {
      Teams.update( { _id: this._id }, { $set: { ionicId: $('#ionicId').val() } }, function(err) {
        if (err)
          sAlert.error('Can\'t update Ionic ID, please provide a valid ID');
        else {
          $('#ionicId').parent().addClass('disabled');
          $('#changeIonicId').removeClass('green');
        }
      });

    }

  },

});

Template.editTeam.onRendered(function() {
  $('.ui.search.dropdown')
    .dropdown({
      maxSelections: 8
    });
});

//--------------------------------------------------------------

Template.editableTeamMember.helpers({
  isScrum() {
    return Roles.userIsInRole(this._id, SCRUM);
  },

})

Template.editableTeamMember.events({
  'click #delete-icon': function(event, template) {
    var self = this;
    var team = this.team();
    Meteor.call('removeFromTeam', self._id, team._id);
  },
});
