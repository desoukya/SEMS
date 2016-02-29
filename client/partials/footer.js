Template.footer.events({
  "click #legal": function(event, template) {
    event.preventDefault();
    $(".ui.modal").modal("show");
  }
});
