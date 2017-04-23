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

		let hours = new Date(Date.now() - (1 * 60 * 60 * 1000))
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
	questionTitle(objectId) {
		let question = Questions.findOne({
			_id: objectId
		})
		return question.title
	},
	isAnAnnouncement() {
		return this.type === 'announcement'

	},
	announcementTitle(objectId) {
		let announcement = Announcements.findOne({
			_id: objectId
		})
		return announcement.title
	},
	isAnAnswer() {
		return(this.type === 'bestAnswer' || this.type === 'follow')

	},
	questionTitleOfAnswer(objectId) {
		let question = Questions.findOne({
			answers: {
				$in: [objectId]
			}
		})
		return question.title
	},

	isAPost() {
		return this.type === 'post'

	},
	postTitle(objectId) {
		let post = Posts.findOne({
			_id: objectId
		})
		return post.title
	},
})
