Template.registerHelper('equals', function(a, b) {
  return a === b;
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.registerHelper('increment', function(number) {
  var res = parseInt(number);
  return res+1;
});