Template.tagsEdit.helpers({

	tags: function() {
		return Tags.find({}, {
			sort: {
				createdAt: -1
			}
		});
	}
});

Template.tagsEdit.onRendered(function() {
	$('#type').dropdown({
		//allowAdditions: true,
		direction: 'downward'
	});
})
Template.tagsEdit.events({
	'submit .form-register': function(e) {
		e.preventDefault();

		var tagName = e.target.tagName.value;
		var type = $("#type").val();

		let Tag = {
			name: tagName,
			tagType: type
		}

		Meteor.call('createTag', Tag, function(err) {
			if(err)
				sAlert.error(err.reason);

		});
		e.target.tagName.value = '';
		$('.ui.dropdown').dropdown('clear');

	},

	'click #delete-icon': function() {

		Meteor.call('deleteTag', this._id, function(err) {
			if(err)
				sAlert.error(err.reason);
		})

	}
})
