Template.staffGroupPosts.onRendered(function() {

})
Template.staffGroupPosts.helpers({
	getPosts() {
		var postsIds = this.posts;
		var posts = Posts.find({
			_id: {
				$in: postsIds
			}
		}, {
			sort: {
				createdAt: -1
			}
		}).fetch()

		return posts;
	},
	getOwnerName(ownerId) {
		var owner = Meteor.users.findOne({
			_id: ownerId
		})
		return owner.fullName()
	},
	canEdit(postOwnerId) {
		if(postOwnerId === Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}

})

Template.staffGroupPosts.events({
	'click #add-button': function(event) {
		event.preventDefault()
		$('#post-create-modal').modal('show');
	},
	'click #edit-icon': function(event) {
		event.preventDefault();
		Session.set('postId', this._id);

		$('#post-edit-modal').modal('show');

	},
	'click #delete-icon': function(event) {
		event.preventDefault();
		let postId = this._id;
		Meteor.call('deletePost', postId, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
	}

})

Template.createPost.events({
	'submit #create': function(event) {
		event.preventDefault();
		let title = event.target.title.value;
		let description = event.target.description.value;
		var groupId = Template.parentData(1)._id;
		let ownerId = Meteor.userId();

		let Post = {
			title,
			description,
			ownerId,
			groupId,
		}


		Meteor.call('createPost', Post, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
		event.target.description.value = '';
		event.target.title.value = '';
		$('#post-create-modal').modal('hide');

	},
})
Template.EditPost.events({
	'submit #editForm': function(event) {
		event.preventDefault();
		let title = event.target.title.value;
		let description = event.target.description.value;
		let ownerId = Meteor.userId();
		let postId = Session.get('postId')

		let Post = {
			postId,
			title,
			description,
			ownerId,
		}


		Meteor.call('updatePost', Post, function(err) {
			if(err) {
				sAlert.error(err.reason)
			}
		})
		event.target.description.value = '';
		event.target.title.value = '';
		$('#post-edit-modal').modal('hide');

	},
})
