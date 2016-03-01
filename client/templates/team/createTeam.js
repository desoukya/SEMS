Template.createTeam.events({
  "submit .form": function(event) {
    event.preventDefault();

    var name = event.target.teamName.value;
    var githubRepo = event.target.repoLink.value;
    var company = event.target.company.value;

    var team = {
      name: name,
      company: company,
      repo: githubRepo,
      members: [Meteor.userId()],
      createdAt: new Date()
    };

    Meteor.call("createTeam", team, function(err, teamId) {
      if (err) {
        $('.ui.form').form('add errors', {
          error: err.reason
        });
      } else {
        sAlert.success("Your team is created successfully !")
        Router.go("team", {
          _id: teamId
        });
      }
    });

  },

  'change .ui.search.selection.dropdown': function(event, template) {
    var companyId = template.find("input[name=company]").value;

    var imageName = Companies.findOne({
      _id: companyId
    }).image;

    $("#team-main-image").attr("src", `/images/teams/${imageName}`);
  },


});

Template.createTeam.helpers({
  companies() {

    var takenCompanies = [];

    Teams.find().fetch().forEach(function(team) {
      takenCompanies.push(team.company);
    });
    takenCompanies = [].concat.apply([], takenCompanies);

    return Companies.find({
      _id: {
        $nin: takenCompanies
      }
    });

  },

});


Template.createTeam.onRendered(function() {
  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            name: {
              identifier: 'teamName',
              rules: [{
                type: 'minLength[6]',
                prompt: 'Team name must be at least 6 characters '
              }]
            },
            company: {
              identifier: 'company',
              rules: [{
                type: 'empty',
                prompt: 'Please select the company you will work for'
              }]
            },
            repoLink: {
              identifier: 'repoLink',
              rules: [{
                  type: 'empty',
                  prompt: 'Please enter your repo URL'
                },
                {
                  type: 'url',
                  prompt: 'Please enter a valid repo URL'
                },
                ] //TODO : Add github regexp
            },

          }
        });
    });

  $('.ui.dropdown').dropdown();
});
