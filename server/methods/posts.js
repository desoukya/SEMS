Meteor.methods({

	createPost(Post) {

		var {
			title,
			description,
			ownerId,
			groupId,

		} = Post;



		if(title == "") {
			throw new Meteor.Error(400, "The Post must have a title");
		}
		if(description == "") {
			throw new Meteor.Error(400, "The post must have a description");
		}


		postId = Posts.insert({
			"title": title,
			"description": description,
			"ownerId": Meteor.userId(),
			"createdAt": Date.now()
		});
		StaffGroups.update({
			_id: groupId
		}, {
			$push: {
				posts: postId
			}
		});

	},

	deletePost(postId) {


		let post = Posts.findOne({
			_id: postId
		});
		let userId = Meteor.userId();


		if(!post)
			throw new Meteor.Error(404, 'The post you are trying to delete is not found');

		if(userId == post.ownerId) {
			StaffGroups.update({
				posts: postId
			}, {
				$pull: {
					posts: postId
				}
			});

			Posts.remove(postId);
		} else {
			throw new Meteor.Error(401, 'You are not authorized to delete this post !');
		}
	},
	updatePost(Post) {

		var {
			postId,
			title,
			description,
			ownerId

		} = Post;

		if(title == "") {
			throw new Meteor.Error(401, "You should specify a post title");
		}
		if(description == "") {
			throw new Meteor.Error(401, "You should specify a post description");
		}
		if(ownerId == Meteor.userId()) {

			Posts.update({
				_id: postId
			}, {
				$set: {
					title: title,
					description: description
				}
			});
		} else {
			throw new Meteor.Error(401, "You're not authorized to update this post")
		}
	},



})
