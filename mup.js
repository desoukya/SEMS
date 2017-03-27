module.exports = {
	servers: {
		one: {
			host: Meteor.settings.host,
			username: Meteor.settings.username,
			pem: Meteor.settings.pem
			// password:
			// or leave blank for authenticate from ssh-agent
		}
	},

	meteor: {
		name: 'SEMS',
		path: Meteor.settings.path,
		servers: {
			one: {},
		},
		buildOptions: {
			serverOnly: true,
		},
		env: {
			ROOT_URL: Meteor.settings.ROOT_URL,
			MONGO_URL: Meteor.settings.MONGO_URL,
		},


		docker: {
			// change to 'kadirahq/meteord' if your app is not using Meteor 1.4
			image: 'abernix/meteord:base',
		},
		deployCheckWaitTime: 60,

		// Show progress bar while uploading bundle to server
		// You might need to disable it on CI servers
		enableUploadProgressBar: false
	},

	mongo: {
		oplog: true,
		port: 27017,
		version: '3.4.1',
		servers: {
			one: {},
		},
	},
};
