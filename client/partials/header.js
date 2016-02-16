Template.header.events({
  "click .logout": function(event) {
    Accounts.logout();
    console.log("signed out");
    Router.go('home');
  }
});
