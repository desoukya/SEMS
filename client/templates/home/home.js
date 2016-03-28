// Meteor.subscribe("leaderboardSortedTeams");
Template.home.helpers({
  isInTeam() {
    return TeamUtils.isInTeam(Meteor.userId());
  },

  getTeamSlug() {
    return TeamUtils.getTeam(Meteor.userId()).slug;
  },

  teams() {
    return Teams.find({}).map(function(item, index) {
      item.number = index + 1;
      return item;
    });
  },

  leaderboardSettings() {
    return {
      rowsPerPage: 40,
      showNavigation: 'auto',
      filters: ['myFilter'],
      fields: [{
        key: 'number',
        label: 'Position',
        headerClass: 'leaderboard-head leaderboard-score center aligned',
        tmpl: Template.numberRenderTmpl,
        sortOrder: 1,
        sortDirection: 'ascending'
      }, {
        key: 'name',
        label: 'Name',
        headerClass: 'leaderboard-head center aligned',
        cellClass: 'name-cell center aligned',
        sortable: false
      }, {
        key: 'company.image',
        label: 'Company',
        headerClass: 'leaderboard-head center aligned',
        tmpl: Template.imageRenderTmpl,
        sortable: false
      }, {
        key: 'metrics.dailyPoints',
        label: 'Score',
        headerClass: 'leaderboard-head leaderboard-score center aligned',
        cellClass: 'score-cell center aligned',
        sortOrder: 0,
        sortDirection: 'descending'
      }]
    };
  }
});

Template.numberRenderTmpl.helpers({

  isFirst(number) {
    return number == 1;
  }

});