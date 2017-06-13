Template.teamPosts.onRendered(function() {

})
Template.createPost.onCreated(function() {
	var template = this;
	template.input = new ReactiveVar('')
	template.output = new ReactiveVar('')
	template.autorun(() => {
		var input = template.input.get()
		template.output.set(input);
	})

})
Template.EditPost.onCreated(function() {
	var template = this;
	template.input = new ReactiveVar('')
	template.output = new ReactiveVar('')
	template.autorun(() => {
		var input = template.input.get()
		template.output.set(input);
	})

})
Template.EditPost.helpers({

	currentPost() {
		let postId = Session.get('postId');
		return Posts.findOne({
			_id: postId
		})
	}
})
Template.teamPosts.helpers({
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
	},
	availablePosts() {
		if(this.posts.length != 0) {
			return true
		}
		return false
	}

})

Template.teamPosts.events({
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
	},
	'click #help-icon': function(event, template) {

		$('#post-help-modal').modal('show');
	},


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
	'keyup textarea': function(event, template) {
		var input = template.$(event.currentTarget).val();
		template.input.set(input);
	}
})
Template.EditPost.events({
	'submit #editForm': function(event) {
		event.preventDefault();
		let title = event.target.title.value;
		let description = event.target.description.value;
		let ownerId = Meteor.userId();
		let postId = Session.get('postId')
		var groupId = Template.parentData(1)._id;

		let Post = {
			postId,
			title,
			description,
			ownerId,
			groupId
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
	'keyup textarea': function(event, template) {
		var input = template.$(event.currentTarget).val();
		template.input.set(input);
	}

})
