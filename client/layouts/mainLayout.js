Template.mainLayout.onRendered(function() {
  let elements = this.findAll("[data-class]") || [];
  for (let element of elements) {
    element.setAttribute("class", element.getAttribute("data-class"));
  }
});
