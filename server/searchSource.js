SearchSource.defineSource('users', function(searchText, options) {
  var results = [];
  //the object doesn't containts any of these properties they are add automatically
  options = _.extend({
    skip: 0,
    limit: 50,
    sort: {'roles':1}
  }, options);
  //Make sure the name is good enough
  if(searchText !== undefined) {
    var parts = searchText.trim().split(' '),
        regExp = new RegExp("(" + parts.join('|') + ")", "ig"),
    selector = {$or: [
      {'profile.firstName': regExp},
      {'profile.lastName' : regExp},
      {'emails.0.address' : regExp}
    ]};
    if(options.role){
      selector = {roles : options.role};
    }
    results = Meteor.users.find(selector, options).fetch();
  } else {
    selector = {}
    
    results = Meteor.users.find(selector, options).fetch();
  }
  return results;
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
