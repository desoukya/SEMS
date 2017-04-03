Template.staffTeamLinks.onRendered(function() {

})
Template.staffTeamLinks.helpers({
	getLinks() {
		return this.links;
	}
})

Template.staffTeamLinks.events({
	'submit .form': function(event) {
		event.preventDefault();
		let title = event.target.title.value;
		let description = event.target.description.value;
		let createdAt = Date.now();
		let link = {
			title,
			description,
			createdAt
		}
		var existingLinks = this.links;
		var newLink = [link];
		var newLinks = existingLinks.concat(newLink);

		console.log(newLinks)

		let teamInfo = {
			_id: this._id,
			links: newLinks,
		}
		console.log(teamInfo)

		Meteor.call('updateLinks', teamInfo, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
		event.target.description.value = '';
		event.target.title.value = '';


	},
})
