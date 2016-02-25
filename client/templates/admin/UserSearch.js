var lastQuery = "";

Session.setDefault('pageSize', 6);
Session.setDefault('page', 0);
Session.setDefault('loading', true);

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['profile.firstName', 'profile.lastName'];

UserSearch = new SearchSource('users', fields, options);

Template.manageUsers.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var size = Session.get('pageSize'),
    page = Session.get('page');
    //console.log("WHY NO LOADING ?!!");

    if (!!lastQuery) {
      //console.log("parameters are " + (page * size) + "  " + size);
      UserSearch.search(lastQuery, {
        skip: page * size,
        limit: size
      });
      //console.log(UserSearch.getData());
    }
  });
  Tracker.autorun(function(){
    //console.log(UserSearch.getData().length);
    //console.log("dataChanged")
  })
});
/*-----------------------------------*/
Template.manageUsers.helpers({
  users: function() {
    var size, page;
    Tracker.nonreactive(function() {
      size = Session.get('pageSize');
      page = Session.get('page');
    });

    return UserSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<em>$&</em>");
      },
      limit: (page + 1) * size
    }, true);
  },

  /*-----------------------------------*/
  isLoading: function() {
    return UserSearch.getStatus().loading;
  }
});

Template.manageUsers.rendered = function() {
  //UserSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var query = $(e.target).val().trim();
    //console.log(query);
    if (query && query.length > 0) {
      if (query !== lastQuery) {
        Session.set('page', 0);
        var size = Session.get('pageSize');
        lastQuery = query;
        //console.log("case 1");

        UserSearch.search(query, {
          skip: 0,
          limit: size
        });
      }
    } else {
      //clear result
      //console.log("case 2");
      lastQuery = query;
      UserSearch.store.remove({});
    }
    /*var text = $(e.target).val().trim();
    UserSearch.search(text);*/
  }, 200)
});
  /*-----------------------------------*/

var scrollListener = _.debounce(function() {
  var diff = $(document).height()-$(window).height();
  // All the taxing stuff you do
  if ($(window).scrollTop() === diff){
    //console.log("---------- load More ----------");
    Session.set('page', Session.get('page') + 1);
  }
}, 50);

Template.searchBox.onCreated(function(){
  //console.log("infinite scroll added");
  window.addEventListener('scroll', scrollListener);
});

Template.searchBox.onDestroyed(function(){
  //console.log("infinite scroll removed");
  window.removeEventListener('scroll', scrollListener);
});