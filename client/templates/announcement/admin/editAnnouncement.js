Template.editAnnouncement.helpers({
  availableTeams() {
    return Teams.find();
  },

  currentAnnouncementDropdownFormatted(teams) {
    var formattedTeams = teams.join(',');
    return formattedTeams;
  },

  currentAnnouncement() {
    if (!!Session.get('selectedAnnouncementId'))
      return Announcements.findOne({ _id: Session.get('selectedAnnouncementId') });
  },

});

Template.editAnnouncement.onRendered(function() {
  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          inline: true,
          fields: {
            name: {
              identifier: 'title',
              rules: [{
                type: 'minLength[6]',
                prompt: 'Title must be at least 6 characters '
              }]
            },

            description: {
              identifier: 'description',
              rules: [{
                type: 'empty',
                prompt: 'Please add a description'
              }]
            },
          }
        });
    });

  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
});

Template.editAnnouncement.events({
  'submit .form': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var description = event.target.description.value;
    var companies = event.target.companies.value.split(',').filter(function(company) {
      return company.length > 0;
    });
    var globalToggle = $('#global').prop('checked');
    var milestone = $('#milestone').prop('checked');

    var announcement = {
      title: title,
      description: description,
      global: globalToggle,
      milestone: milestone,
      teams: companies,
    };

    var data = {
      _id: Session.get('selectedAnnouncementId'),
      announcement: announcement
    };

    Meteor.call('updateAnnouncement', data, function(err, announcementCount) {
      if (err) {
        $('.ui.form').form('add errors', {
          error: err.reason
        });
      } else {
        sAlert.success('Your Announcement is edited successfully !');
        $('.ui.form').form('reset');
        $('.selection.dropdown').removeClass('disabled');
        setTimeout(function() {
          $('#announcement-edit-modal').modal('hide');
        }, 750);
      }
    });

  },

  'change #global': function(event) {
    if (event.currentTarget.checked) {
      $('.selection.dropdown').dropdown('clear');
      $('.selection.dropdown').addClass('disabled');
    } else
      $('.selection.dropdown').removeClass('disabled');

  },

})
