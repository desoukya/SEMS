module.exports = {
	servers: {
		one: {
			host: "35.165.204.233",
			username: "ubuntu",
			pem: "/home/yasmeenwafa/Desktop/sems.pem"
			// password:
			// or leave blank for authenticate from ssh-agent
		}
	},

	meteor: {
		name: 'SEMS',
		path: "/home/yasmeenwafa/Desktop/SEMS",
		servers: {
			one: {},
		},
		buildOptions: {
			serverOnly: true,
		},
		env: {
			ROOT_URL: "http://ec2-35-165-204-233.us-west-2.compute.amazonaws.com",
			MONGO_URL: "mongodb://localhost/meteor",
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
		version: '3.4.2',
		servers: {
			one: {},
		},
	},
};
