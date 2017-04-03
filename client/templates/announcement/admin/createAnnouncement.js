Template.createAnnouncement.helpers({
	teams() {
		return Teams.find();
	},
	staffTeams() {
		return StaffTeams.find();
	}

});

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
			} else {
				sAlert.success('Your Announcement is published successfully !');
				$('.ui.form').form('reset');
				$('.selection.dropdown').removeClass('disabled');
				$('#announcement-create-modal').modal('hide');
			}
		});


	},

	'change #global': function(event) {
		if(event.currentTarget.checked) {
			$('.selection.dropdown').dropdown('clear');
			$('.selection.dropdown').addClass('disabled');
		} else {
			$('.selection.dropdown').removeClass('disabled');
		}

	},

})
