Template.registerHelper('equals', function(a, b) {
  return a === b;
});

Template.registerHelper('formatDate', function(date) {
  //need to confirm date format
  return moment(parseInt(date)).format('MM-DD-YYYY');
});

Template.registerHelper('detailedDate', function(date) {
  //need to confirm date format
  return moment(parseInt(date)).format('LLL');
});

Template.registerHelper('formatDateHumanized', function(date) {
  return moment(parseInt(date)).fromNow();
});

Template.registerHelper('increment', function(number) {
  var res = parseInt(number);
  return res + 1;
});

Template.registerHelper('lowerCamelCase', function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});


Template.registerHelper('isActive', function(route) {
  if (isCurrentRoute(route)) {
    return 'active';
  }
  return '';
});

Template.registerHelper('colorOfRole', function(role) {
  var roleColor;
  switch (role) {
    case ADMIN:
      roleColor = "red";
      break;
    case LECTURER:
      roleColor = "orange";
      break;
    case TA:
      roleColor = "olive";
      break;
    case JTA:
      roleColor = "purple";
      break;
    case SCRUM:
      roleColor = "teal";
      break;
    case STUDENT:
      roleColor = "green";
      break;
  }
  return roleColor;
});

// Based on this answer on SO :
// http://stackoverflow.com/a/28019575/3357910
// Passing variable to template and extend it to the current context
Template.registerHelper('extendContext', function(key, value) {
  var result = _.clone(this);
  result[key] = value;
  return result;
});
