Template.createAnnouncement.helpers({
  teams() {
    return Teams.find();
  },

});
Template.createAnnouncement.onRendered(function() {
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
                prompt: 'title must be at least 6 characters '
              }]
            },

            description: {
              identifier: 'description',
              rules: [{
                type: 'empty',
                prompt: 'Please add a description'
              }]
            },

            /*companies: {
              identifier: 'companies',
              rules: [{
                type: 'minCount[1]',
                prompt: 'Please enter at leaset one team'
              }]
            },*/

          }
        });
    });
  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
});

Template.createAnnouncement.events({
  'submit .form': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var description = event.target.description.value;
    var companies = event.target.companies.value.split(',').filter(function(company) {
      return company.length > 0;
    });
    var global = $('#global').prop('checked');
    var milestone = $('#milestone').prop('checked');
    var announcement = {
      title: title,
      ownerId: Meteor.userId(),
      description: description,
      global: global,
      milestone: milestone,
      teams: companies,
      createdAt: Date.now()
    };

    Meteor.call('createAnnouncement', announcement, function(err, teamId) {
      if (err) {
        $('.ui.form').form('add errors', {
          error: err.reason
        });
      } else {
        sAlert.success('Your Announcement is announced successfully !');
        $('.ui.form').form('reset');
        $('.selection.dropdown').removeClass('disabled')
      }
    });

  },

  'change #global': function(event) {
    if (event.currentTarget.checked){
      $('.selection.dropdown').dropdown('clear');
      $('.selection.dropdown').addClass('disabled');
    }
    else{
    $('.selection.dropdown').removeClass('disabled');
    }

  },

})