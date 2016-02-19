Template.header.events({
  "click .logout": function(event) {
    Accounts.logout();
    Router.go('home');
  },

  "click .item": function(event, template) {
    $(".item").removeClass("active");
    $(event.target).addClass("active");
  }
});
