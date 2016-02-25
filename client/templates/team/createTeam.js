Template.createTeam.events({
  "submit .form": function(event) {
    event.preventDefault();

    var name = event.target.teamName.value;
    var githubRepo = event.target.repoLink.value;

    var team = {
      name: name,
      repo: githubRepo,
      members: [Meteor.userId()],
      createdAt: new Date()
    };

    Meteor.call("createTeam", team, function(err) {
      if (err) {
        $('.ui.form').form('add errors', {
          error: err
        });
      } else {
        Router.go("team");
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
                type: 'empty',
                prompt: 'Please enter your e-mail'
              }, {
                type: 'minLength[6]',
                prompt: 'Team name must be at least 6 characters '
              }]
            },
            repoLink: {
              identifier: 'repoLink',
              rules: [{
                  type: 'empty',
                  prompt: 'Please enter your repo Link'
                }] //TODO : Add github regexp
            },

          }
        });
    });
});
