// Works on body, performance-wise worse but more reliable
Template.body.onRendered(function() {
	$("body").bind("DOMSubtreeModified", function() {
		let elements = $("[data-class]");
		elements.each(function(index, element) {
			element.setAttribute("class", element.getAttribute("data-class"));
		});
	});
});
