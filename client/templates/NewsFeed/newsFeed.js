Template.newsFeed.helpers({


	fullName() {
		var eventOnwer = Meteor.users.findOne({
			_id: this.eventOwnerId
		})
		return eventOnwer.fullName()
	},
	eventOnwer() {
		var eventOnwer = Meteor.users.findOne({
			_id: this.eventOwnerId
		})
		return [eventOnwer]
	},
	feed() {
		return NewsFeed.find({
			feedOwnerId: Meteor.userId()
		}, {
			sort: {
				createdAt: -1
			}
		});
	},
	isAQuestion() {
		return this.type === 'question'

	},
	tags(objectId) {
		let question = Questions.findOne({
			_id: objectId
		})
		return question.tags
	},
	title(objectId) {
		let question = Questions.findOne({
			_id: objectId
		})
		return question.title
	}
})
