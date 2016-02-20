Template.registerHelper('equals', function(a, b) {
  return a === b;
});
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});