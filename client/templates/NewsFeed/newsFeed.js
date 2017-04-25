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
			feedOwnerId: Meteor.userId(),
		}, {
			sort: {
				createdAt: -1
			}
		});
	},
	newsFeedEmtpy() {

		if(NewsFeed.find({
				feedOwnerId: Meteor.userId()
			}).count() != 0) {
			return true
		} else {
			return false
		}
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
	getNewestAnnouncements() {
		return Announcements.find({
			milestone: false,
			global: true
		}, {
			sort: {
				createdAt: -1
			},
			limit: 5
		});
	},
	getTeamOrGroupSlug() {
		var link = "home";
		if(TeamUtils.isInTeam(Meteor.userId())) {
			var team = TeamUtils.getTeam(Meteor.userId())

			link = "/teams/" + team.slug + "/announcements"

		} else {
			if(TeamUtils.isInGroup(Meteor.userId())) {
				var group = TeamUtils.getGroup(Meteor.userId())
				link = "/staff-groups/" + group.slug + "/announcements"

			}
		}
		return link;
	},
	getNewestMilestones() {
		return Announcements.find({
			milestone: true,
			global: true
		}, {
			sort: {
				createdAt: -1
			},
			limit: 5
		});
	},
	getMilestoneLink(id) {
		return "/milestones/" + id

	}
})
