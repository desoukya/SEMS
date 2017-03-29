Template.githubAuth.events({
	'click .github': function() {
		// initiate the OAuth process:
		// ask for the desired permissions
		// run the callback after the user authorizes the app
		// https://github.com/meteor/meteor/blob/devel/packages/github/github_client.js#L8
		Github.requestCredential({
			loginStyle: 'popup',
			requestPermissions: ['repo']
		}, function(tokenOrError) {
			if(tokenOrError && tokenOrError instanceof Error) {
				// Throw a Meteor error
				console.log('error getting the token');
				return;
			}

			// retrieves credentialSecret from localStorage
			// https://github.com/meteor/meteor/blob/devel/packages/oauth/oauth_client.js#L152
			var credentialSecret = OAuth._retrieveCredentialSecret(tokenOrError);
			console.log('credentialToken:', tokenOrError, 'credentialSecret:', credentialSecret);

			Meteor.callPromise('getGithubAccessToken', tokenOrError, credentialSecret);
		});
	}
});

Template.githubAuth.helpers({
	accessToken() {
		var obj = GitAuth.find({});
		if(obj.count() > 0) {
			return "Access token is " + obj.fetch()[0].accessToken;
		} else {
			return "No access token defined yet"
		}
	},
});
