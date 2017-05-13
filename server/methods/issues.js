Meteor.methods({

    createIssue(issue) {

      var {
        title,
        ownerId,
        description,
        teamId,
        story
      } = issue;

        let userId = Meteor.userId();

        if (title == "") {
            throw new Meteor.Error(400, "The Issue you're creating doesn't have a title");
        }
        if(description == ""){
            throw new Meteor.Error(400, "Please give this Issue a description");
        }
        if ((!Issues.findOne({"title": title})) && Roles.userIsInRole(userId, [ADMIN, SCRUM, JTA, STUDENT])) {

                Issues.insert({
                    "title": title,
                    "ownerId": ownerId,
                    "description" : description,
                    "teamId": teamId,
                    "story": story
                });

                    }
                    else {
                      throw new Meteor.Error(400,"The Issue info you're providing is inavlid")
                    }


    },

    deleteIssue(id) {
        let id_ = id;

        let issue = Issues.findOne({
            _id: id_
        });
        let userId = Meteor.userId();


        if (!issue)
            throw new Meteor.Error(404, 'The issue you are trying to delete is not found');

        if (Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA, SCRUM, STUDENT])) {
            Issues.remove(id_);
        } else {
            throw new Meteor.Error(401, 'You are not authorized to delete this issue !');
        }
    },

    updateIssue(issueData) {
  		let {
  			issueId,
  			description
  		} = issueData;
  		let issue = Issues.findOne({
  			_id: issueId
  		});
  		let userId = Meteor.userId();
  		if(!issue) throw new Meteor.Error(404, "The issue you are trying to comment on is not found");
  		if(userId === issue.ownerId || Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
  			Issues.update({
  				_id: issueId
  			}, {
  				$set: {
  					description: description
  				}
  			});
  		} else throw new Meteor.Error(401, "You are not authorized to edit this issue");
  	},




})
