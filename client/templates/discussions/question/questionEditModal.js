Template.questionEditModal.onRendered(function() {
	$('.ui.dropdown').dropdown({
		allowAdditions: true
	});
});
Template.questionEditModal.helpers({
	separatedTags() {
		return this.tags.join();
	},
	'allTags': function() {

		return Tags.find({});
	}
});
