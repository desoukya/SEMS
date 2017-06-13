Template.createAnnouncement.helpers({
	teams() {
		return Teams.find({
			isForStaff: false
		});
	},
	staffGroups() {
		return Teams.find({
			isForStaff: true
		});
	},

	// Description() {
	// 	return Session.get('description')
	// }

});
Template.createAnnouncement.onCreated(function() {
	var template = this;
	template.input = new ReactiveVar('')
	template.output = new ReactiveVar('')
	template.autorun(() => {
		var input = template.input.get()
		template.output.set(input);
	})

})

Template.createAnnouncement.onRendered(function() {
	$(document)
		.ready(function() {
			$('.ui.form')
				.form({
					inline: true,
					fields: {

						name: {
							identifier: 'title',
							rules: [{
								type: 'minLength[6]',
								prompt: 'title must be at least 6 characters '
							}]
						},

						description: {
							identifier: 'description',
							rules: [{
								type: 'empty',
								prompt: 'Please add a description'
							}]
						},

					}
				});
		});

	$('.ui.dropdown').dropdown();
	$('.ui.checkbox').checkbox();

	//for preview
	// $('#previewText').hide()
	// Session.set('description', "nothing to preview")
	//
	// $('#preview').click(function() {
	// 	$('.active').removeClass('active');
	// 	$(this).addClass('active');
	// });
	//
	// $('#text').click(function() {
	// 	$('.active').removeClass('active');
	// 	$(this).addClass('active');
	// });
});

Template.createAnnouncement.events({
	'submit .form': function(event) {
		event.preventDefault();

		var title = event.target.title.value;
		var description = event.target.description.value;
		var companies = event.target.companies.value.split(',').filter(function(company) {
			return company.length > 0;
		});
		var globalToggle = $('#global').prop('checked'); // global is reserved
		var milestone = $('#milestone').prop('checked');

		var announcement = {
			title: title,
			ownerId: Meteor.userId(),
			description: description,
			global: globalToggle,
			milestone: milestone,
			teams: companies,
		};

		Meteor.call('createAnnouncement', announcement, function(err, announcementId) {
			if(err) {
				$('.ui.form').form('add errors', {
					error: err.reason
				});
				//$('#announcement-create-modal').modal('hide');
			} else {
				sAlert.success('Your Announcement is published successfully !');
				$('.ui.form').form('reset');
				$('.selection.dropdown').removeClass('disabled');
				$('#announcement-create-modal').modal('hide');
			}
		});
		$('#announcement-create-modal').modal('hide');
		// $('.ui small modal').modal('hide');
		// console.log("out")

	},

	'change #global': function(event) {
		if(event.currentTarget.checked) {
			$('.selection.dropdown').dropdown('clear');
			$('.selection.dropdown').addClass('disabled');
		} else {
			$('.selection.dropdown').removeClass('disabled');
		}

	},
	'keyup textarea': function(event, template) {
		var input = template.$(event.currentTarget).val();
		template.input.set(input);
	}

	//for preview

	// 'click #preview ': function(event) {
	//
	//
	// 	var description = $('#description').val();
	// 	console.log(description);
	// 	$('#previewText').show()
	// 	$('#description').hide()
	// 	Session.set('description', description)
	//
	// },
	// 'click #text ': function(event) {
	//
	// 	$('#description').show()
	// 	$('#previewText').hide()
	// }

})
