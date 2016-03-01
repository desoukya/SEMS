Template.footer.events({
  "click #legal": function(event, template) {
    event.preventDefault();
    $("#legal-modal").modal("show");
  }
});
