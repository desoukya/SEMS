Meteor.subscribe("leaderboardSortedTeams");
Template.home.helpers({
  isInTeam() {
    return TeamUtils.isInTeam(Meteor.userId());
  },

  getTeamSlug() {
    return TeamUtils.getTeam(Meteor.userId()).slug;
  },

  teams() {
    console.log(Teams.find({}).fetch());
    return Teams.find({}).map(function(item, index) {
      item.number = index + 1;
      return item;
    });
  },

  leaderboardSettings() {
    return {
      rowsPerPage: 40,
      showFilter: true,
      showNavigation: 'auto',
      fields: [{
        key: 'number',
        label: 'Position',
        headerClass: 'leaderboard-head leaderboard-score',
        sortOrder: 1,
        sortDirection: 'ascending'
      }, {
        key: 'name',
        label: 'Name',
        headerClass: 'leaderboard-head',
        cellClass: 'name-cell',
        sortable: false
      }, {
        key: 'company.image',
        label: 'Company',
        headerClass: 'leaderboard-head',
        cellClass: 'image-cell',
        tmpl: Template.imageRenderTmpl,
        sortable: false
      }, {
        key: 'metrics.dailyPoints',
        label: 'Score',
        headerClass: 'leaderboard-head leaderboard-score',
        cellClass: 'score-cell',
        sortOrder: 0,
        sortDirection: 'ascending'
      }]
    };
  }
});
