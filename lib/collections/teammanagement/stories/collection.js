Stories = new Mongo.Collection('stories');

Stories.helpers({
	owner() {
		return Meteor.users.findOne({
			_id: this.ownerId
		});
	},
	title(){
	//	console.log("testserver story");
		return this.title;
	}
});
