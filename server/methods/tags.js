Meteor.methods({

	createTag(Tag) {

		var {
			name,
			tagType
		} = Tag;

		let userId = Meteor.userId();

		if(name == "") {
			throw new Meteor.Error(400, "The tag you're creating doesn't have a name");
		}
		if(tagType == "") {
			throw new Meteor.Error(400, "Please specify tag type");
		}
		if((!Tags.findOne({
				"name": name
			})) && Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {

			Tags.insert({
				"name": name,
				"type": tagType,
				"createdAt": Date.now()
			});

		} else {
			throw new Meteor.Error(400, "The tag info you're providing is not correct")
		}


	},

	deleteTag(id) {
		let id_ = id;

		let tag = Tags.findOne({
			_id: id_
		});
		let userId = Meteor.userId();


		if(!tag)
			throw new Meteor.Error(404, 'The tag you are trying to delete is not found');

		if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
			Tags.remove(id_);
		} else {
			throw new Meteor.Error(401, 'You are not authorized to delete this tag !');
		}
	},


})
