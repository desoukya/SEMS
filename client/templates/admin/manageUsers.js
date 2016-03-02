//store last search query
var lastQuery = "";
//TODO : change them from session to active vars/dict
//TODO : enable loading
//page size -> is the count of elements that should be added by page
//page -> how many page should be loaded
Session.setDefault('pageSize', 6);
Session.setDefault('page', 0);
Session.setDefault('loading', true);
Session.setDefault('role', "all");

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
//number of fields to search on the client (used for client side search and text transformation)
var fields = ['profile.firstName', 'profile.lastName', 'emails.0.address'];

//the Search Source Object
UserSearch = new SearchSource('users', fields, options);

//------------------------- manageUsers Template --------------------------------------------
Template.manageUsers.onCreated(function() {
  //every time the page count changes get more data (infinte Scrolling)
  var self = this;
  Session.set('role', "all");
  //track when page is changed
  self.autorun(function() {
    var size = Session.get('pageSize');
    var page = Session.get('page');
    var role = "";
    Tracker.nonreactive(function() {
      role = Session.get('role');
    });

    if (lastQuery !== undefined) {
      var options = {
        skip: page * size,
        limit: size,
      };
      if (role != "all")
        options.role = role;
      UserSearch.search(lastQuery, options)
    }
  });
  //track when role is changed 
  self.autorun(function() {
    var size = Session.get('pageSize');
    var role = Session.get('role');
    var page = "";
    Tracker.nonreactive(function() {
      page = Session.get('page');
    });
    UserSearch.store.remove({});
    UserSearch.cleanHistory();
    if (lastQuery !== undefined) {
      var options = {
        skip: page * size,
        limit: size,
      };
      if (role != "all")
        options.role = role;
      UserSearch.search(lastQuery, options)
    }
  });
});

Template.manageUsers.onDestroyed(function() {
  lastQuery = "";
  $('#search-box').val("")
  UserSearch.store.remove({});
  UserSearch.cleanHistory();
});
Template.manageUsers.helpers({
  //returns the currunt users from the search Source object
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

  roles: function() {
    return ROLES;
  }
});

Template.manageUsers.events({
  //updates user roles
  "click #update-users-button": function(event, template) {
    var pairs = Session.get("toBeUpdatedRoles");
    for (var id in pairs) {
      if (pairs.hasOwnProperty(id)) {
        Meteor.call("updateRole", id, pairs[id]);
      }
    }
    //-------------recall search ------------
    UserSearch.cleanHistory();
    UserSearch.store.remove({});
    var size = Session.get('pageSize'),
      page = Session.get('page');
    UserSearch.search(lastQuery, {
      skip: 0,
      limit: size
    });
    //-------------------------
    Session.set("toBeUpdatedRoles", undefined);
  },
});
//------------------------- User Entry Template --------------------------------------------
Template.userEntry.created = function() {
  this.modified = new ReactiveVar(false);
};
Template.userEntry.onRendered(function() {
  var self = this;
  // dropdowns are having user ids as ids !
  var selector = "#" + self.data._id;
  // Initialize dropdowns with current role as selected
  $(selector)
    .dropdown('set selected', self.data.roles[0]);
  this.modified.set(false);

});

Template.userEntry.events({
  "change .ui.selection.dropdown": function(event, template) {
    var id = template.find(".ui.selection.dropdown").id;
    var role = template.find("input[name=role]").value;

    var roles = Session.get("toBeUpdatedRoles");
    if (!roles) {
      roles = {};
    }

    roles[id] = role;
    template.modified.set(true);
    Session.set("toBeUpdatedRoles", roles);
  },

});

Template.userEntry.helpers({
  username: function() {
    // FIXME: this should be extracted into a method or extended in user object
    var user = Meteor.users.findOne(this._id);
    return user.profile.firstName + " " + user.profile.lastName;
  },
  curruntEmail: function() {
    var user = Meteor.users.findOne(this._id);
    return user.emails[0].address;
  },

  role: function() {
    // Enforcing one role for user for current setup
    return Meteor.users.findOne(this._id).roles[0];
  },
  modified: function() {
    return Template.instance().modified.get();
  }
});

//------------------------- filterLabel Template --------------------------------------------
Template.filterLabel.helpers({
  countOf: function(role) {
    if (role === "all") {
      return Meteor.users.find().count()
    } else {
      return Meteor.users.find({
        roles: role
      }).count()
    }
  },
})
Template.filterLabel.events({
  "click .ui.label": function(event, template) {
    var size = Session.get('pageSize');
    Session.set('role', this.role);
    Session.set('page', 0);
  },
});
//------------------------- searchBox Template --------------------------------------------
Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var query = $(e.target).val().trim();
    if (query !== undefined) {
      if (query !== lastQuery) {
        Session.set('page', 0);
        var size = Session.get('pageSize');
        lastQuery = query;

        UserSearch.search(query, {
          skip: 0,
          limit: size
        });
      }
    } else {
      //clear result
      lastQuery = query;
      UserSearch.store.remove({});
    }
    /*var text = $(e.target).val().trim();
        UserSearch.search(text);*/
  }, 200)
});
/*-----------------------------------*/

var scrollListener = _.debounce(function() {
  var diff = $(document).height() - $(window).height();
  // All the taxing stuff you do
  if ($(window).scrollTop() === diff) {
    Session.set('page', Session.get('page') + 1);
  }
}, 50);

Template.searchBox.onCreated(function() {
  window.addEventListener('scroll', scrollListener);
});

Template.searchBox.onDestroyed(function() {
  window.removeEventListener('scroll', scrollListener);
});