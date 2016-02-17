Template.header.events({
  "click .logout": function(event) {
    Accounts.logout();
    Router.go('home');
  }
});
