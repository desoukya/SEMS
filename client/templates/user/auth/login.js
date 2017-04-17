Template.login.events({
	'submit .form': function(event) {
		event.preventDefault();

		var email = event.target.email.value.trim();
		var password = event.target.password.value;

		Meteor.loginWithPassword(email, password, function(err) {
			if(err) {
				sAlert.error(err.reason);
			} else {
				mixpanel.time_event('SessionTime');


				/////////////// Analytics ///////////////
				analytics.identify(Meteor.userId(), {
					email: Meteor.user().email(),
					name: Meteor.user().fullName(),
					GUCId: Meteor.user().profile.GUCId,
					tutorialGroup: Meteor.user().profile.tutorialGroup,
					roles: Meteor.user().roles
				});
				/////////////// Analytics ///////////////

				Router.go('/');
			}
		});

	},

});

Template.login.onRendered(function() {
	$(document).ready(function() {
		$('.ui.form').form({
			fields: {

				email: {
					identifier: 'email',
					rules: [{
						type: 'empty',
						prompt: 'Please enter your e-mail'
					}, {
						type: 'email',
						prompt: 'Please enter a valid e-mail'
					}]
				},

				password: {
					identifier: 'password',
					rules: [{
						type: 'empty',
						prompt: 'Please enter your password'
					}, {
						type: 'length[6]',
						prompt: 'Your password must be at least 6 characters'
					}]
				},

			}
		});
	});

});
