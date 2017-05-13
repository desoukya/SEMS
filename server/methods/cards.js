Meteor.methods({

    createCard(card) {

      var {
        title,
        ownerId,
        description,
        teamId,
        type
      } = card;

        let userId = Meteor.userId();

        if (title == "") {
            throw new Meteor.Error(400, "The Card you're creating doesn't have a title");
        }
        if(description == ""){
            throw new Meteor.Error(400, "Please give this Card a description");
        }
        if ((!Cards.findOne({"title": title})) && Roles.userIsInRole(userId, [ADMIN, SCRUM, JTA, STUDENT])) {

                Cards.insert({
                    "title": title,
                    "ownerId": ownerId,
                    "description" : description,
                    "teamId": teamId,
                    "type": type
                });

                    }
                    else {
                      throw new Meteor.Error(400,"The Card info you're providing is inavlid")
                    }


    },

    deleteCard(id) {
        let id_ = id;

        let card = Cards.findOne({
            _id: id_
        });
        let userId = Meteor.userId();


        if (!card)
            throw new Meteor.Error(404, 'The card you are trying to delete is not found');

        if (Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA, SCRUM, STUDENT])) {
            Cards.remove(id_);
        } else {
            throw new Meteor.Error(401, 'You are not authorized to delete this card !');
        }
    },




})
