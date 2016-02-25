//store last search query 
var lastQuery = "";

//TODO : change them from session to active vars/dict
//TODO : enable loading 
//page size -> is the count of elements that should be added by page
//page -> how many page should be loaded
Session.setDefault('pageSize', 6);
Session.setDefault('page', 0);
Session.setDefault('loading', true);

var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
//number of fields to search on the client (used for client side search and text transformation)
var fields = ['profile.firstName', 'profile.lastName'];

//the Search Source Object
UserSearch = new SearchSource('users', fields, options);

//------------------------- manageUsers Template --------------------------------------------
Template.manageUsers.onCreated(function() {
    //every time the page count changes get more data (infinte Scrolling)
    var self = this;
    self.autorun(function() {
        var size = Session.get('pageSize'),
            page = Session.get('page');

        if (!!lastQuery) {
            UserSearch.search(lastQuery, {
                skip: page * size,
                limit: size
            });
        }
    });
    Tracker.autorun(function() {})
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
    console.log(this.modified.set(false));

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
        //console.log(template.modified.get());
        Session.set("toBeUpdatedRoles", roles);
    },

});

Template.userEntry.helpers({
    username: function() {
        // FIXME: this should be extracted into a method or extended in user object
        var user = Meteor.users.findOne(this._id);
        return user.profile.firstName + " " + user.profile.lastName;
    },

    role: function() {
        // Enforcing one role for user for current setup
        return getRole(this._id);
    },
    modified: function() {
        return Template.instance().modified.get();
    }
});

//------------------------- searchBox Template --------------------------------------------
Template.searchBox.events({
    "keyup #search-box": _.throttle(function(e) {
        var query = $(e.target).val().trim();
        if (query && query.length > 0) {
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
