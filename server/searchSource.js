SearchSource.defineSource('users', function(searchText, options) {
  var results = [];
  console.log("server reached")
  options = _.extend({
    skip: 0,
    limit: 50,
    sort: {created: -1}
  }, options);

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
  console.log(selector);
  console.log(Meteor.users.find().count());
  console.log(results);
  return results;
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
