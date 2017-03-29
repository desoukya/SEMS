Template.registerHelper('equals', function(a, b) {
	return a === b;
});

Template.registerHelper('formatDate', function(date) {
	//need to confirm date format
	return moment(parseInt(date)).format('MM-DD-YYYY');
});

Template.registerHelper('detailedDate', function(date) {
	//need to confirm date format
	return moment(parseInt(date)).format('LLL');
});

Template.registerHelper('formatDateHumanized', function(date) {
	return moment(parseInt(date)).fromNow();
});

Template.registerHelper('increment', function(number) {
	var res = parseInt(number);
	return res + 1;
});

Template.registerHelper('lowerCamelCase', function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
});


Template.registerHelper('isActive', function(route) {
	if(isCurrentRoute(route)) {
		return 'active';
	}
	return '';
});

Template.registerHelper('colorOfRole', function(role) {
	let roleColors = {
		"admin": 'red',
		"lecturer": 'orange',
		"teaching-assistant": 'olive',
		"junior-teaching-assistant": 'purple',
		"scrum-master": 'teal',
		"student": 'green',

	}

	return roleColors[role];

});

Template.registerHelper('colorOfTag', (name) => {
	var tag = Tags.findOne({
		"name": name
	});


	let tagsColors = {
		lecture: 'yellow',
		lab: 'yellow',
		project: 'red',
		topic: 'teal'
	}
	return tagsColors[tag.type];

});


// Based on this answer on SO :
// http://stackoverflow.com/a/31525361/3357910
// Passing variable to template and extend it to the current context
Template.registerHelper('extendContext', function(data) {
	return _.extend({}, this, data.hash);
});
