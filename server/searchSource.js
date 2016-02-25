SearchSource.defineSource('users', function(searchText, options) {
  var results = [];
  //the object doesn't containts any of these properties they are add automatically
  options = _.extend({
    skip: 0,
    limit: 50,
    sort: {created: -1}
  }, options);
  //Make sure the name is good enough
  if(searchText) {
    var parts = searchText.trim().split(' '),
        regExp = new RegExp("(" + parts.join('|') + ")", "ig"),
    selector = {$or: [
      {'profile.firstName': regExp},
      {'profile.lastName' : regExp}
    ]};
    results = Meteor.users.find(selector, options).fetch();
  } else {
    results = Meteor.users.find({}, options).fetch();
  }
  return results;
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
