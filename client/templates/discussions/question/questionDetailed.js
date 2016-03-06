Template.questionDetailed.onRendered(function() {
  $('.date.meta').popup({ inline: true });
});

Template.questionDetailed.helpers({
  detailedDate() {
    return moment(this.createdAt, 'ddd, MMM DD YYYY HH:mm:ss ZZ').format('LLL');
  },

});
