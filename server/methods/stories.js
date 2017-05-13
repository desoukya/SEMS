Meteor.methods({

    createStory(story) {

      var {
        title,
        ownerId,
        sprint,
        description,
        teamId,
        approved,
        achieved,
        priority,
        points
      } = story;

        let userId = Meteor.userId();

        if (title == "") {
            throw new Meteor.Error(400, "The User Story you're creating doesn't have a title");
        }
        if(sprint == ""){
            throw new Meteor.Error(400, "Please specify Sprint Number");
        }
        if ((!Stories.findOne({"title": title})) && Roles.userIsInRole(userId, [ADMIN, SCRUM, JTA])) {

                Stories.insert({
                    "title": title,
                    "ownerId": ownerId,
                    "sprint" : sprint,
                    "description" : description,
                    "teamId": teamId,
                    "approved": approved,
                    "achieved": achieved,
                    "priority": priority,
                    "points": points
                });

                    }
                    else {
                      throw new Meteor.Error(400,"The User Story info you're providing is inavlid")
                    }


    },

    deleteStory(id) {
        let id_ = id;

        let story = Stories.findOne({
            _id: id_
        });
        let userId = Meteor.userId();


        if (!story)
            throw new Meteor.Error(404, 'The story you are trying to delete is not found');

        if (Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA, SCRUM])) {
            Stories.remove(id_);
        } else {
            throw new Meteor.Error(401, 'You are not authorized to delete this story !');
        }
    },

    approveStory(id){
      let id_= id;
      let story = Stories.findOne({
          _id: id_
      });
      let userId = Meteor.userId();

      if(story.approved){
        throw new Meteor.Error(409, 'This story is already approved');
      }

      if(story.ownerId === userId){
        Stories.update({
  				_id: id_
  			}, {
  				$set: {
  					approved: true
  				}
  			});

      }

    },

    achieveStory(id){
      let id_= id;
      let story = Stories.findOne({
          _id: id_
      });
      let userId = Meteor.userId();

      if(story.achieved){
        throw new Meteor.Error(409, 'This story is already approved');
      }

      if(story.ownerId === userId){
        Stories.update({
  				_id: id_
  			}, {
  				$set: {
  					achieved: true
  				}
  			});

      }

    },


})
