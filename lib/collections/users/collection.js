Meteor.users.helpers({
	fullName() {
		return `${this.profile.firstName} ${this.profile.lastName}`;
	},

	email() {
		return this.emails[0].address || this.profile.publicEmail;
	},

	profilePicture() {
		var image = Images.findOne({
			'_id': this.profile.image
		});

		if(image)
			return image;
		else {
			var defaultPictureIndex = UserUtils.getDefaultPictureIndex(this._id);
			return {
				url: `/images/default_${defaultPictureIndex}.png`
			};
		}

	},
	allAnswersCount(userId) {

		var answersCount = Answers.find({
			ownerId: userId
		}).count();

		var bestAnswersCount = Answers.find({
			ownerId: userId,
			bestAnswer: true
		}).count();

		let allAnswersCount = {
			answersCount: answersCount,
			bestAnswersCount: bestAnswersCount
		}
		return allAnswersCount;
	},

	publicEmail() {
		return this.profile.publicEmail;
	},

	havePublicEmail() {
		return this._id === Meteor.userId() || this.profile.publicEmail;
	},

	team() {
		return Teams.findOne({
			members: this._id
		});
	},
	haveSubscriptions() {
		if(this.subscriptions == null) {
			return null
		} else {
			return this.subscriptions
		}
	}

});
