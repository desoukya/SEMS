Template.staffGroupPosts.onRendered(function() {

})
Template.staffGroupPosts.helpers({
	getPosts() {
		return this.posts;
	},
	getOwnerName(ownerId) {
		var owner = Meteor.users.findOne({
			_id: ownerId
		})
		return owner.fullName()
	}
})

Template.staffGroupPosts.events({
	'click #add-button': function(event) {
		event.preventDefault()
		$('#post-create-modal').modal('show');
	},

})

Template.createPost.events({
	'submit .form': function(event) {
		event.preventDefault();
		let title = event.target.title.value;
		let description = event.target.description.value;
		let createdAt = Date.now();
		let owner = Meteor.userId();
		let post = {
			title,
			description,
			createdAt,
			ownerId: owner,

		}
		var existingPosts = this.posts;
		var newPost = [post];
		var newPosts = existingPosts.concat(newPost);



		let teamInfo = {
			_id: this._id,
			postOwnerId: Meteor.userId(),
			posts: newPosts,
		}


		Meteor.call('updatePosts', teamInfo, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
		event.target.description.value = '';
		event.target.title.value = '';
		$('#post-create-modal').modal('hide');

	},
})
