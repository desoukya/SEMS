Meteor.startup(function() {
	let companiesNames = ["angular", "ionic", "mongodb", "socket-io",
		"backbone", "electron", "jasmine", "npm", "stylus", "bonsai", "ember",
		"javascript", "passport", "vuejs", "bootstrap", "grunt", "jquery", "polymer",
		"webpack", "bower", "gulp", "karma-logo", "pugjs", "yeoman", "Browserify",
		"handlebars", "marionette", "raphael", "zurb", "coffeescript", "hapi",
		"materialize", "react", "css3", "html5", "meteor-icon", "sass"
	];

	if(Companies.find().count() === 0) {
		companiesNames.forEach((company, index) => {
			// let company =
			Companies.insert({
				'_id': `${index}`,
				'image': `${company}.png`,
				'name': company
			});
		})
	}

});
