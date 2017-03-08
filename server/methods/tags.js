Meteor.methods({

  createTag(tagName, course)
  {
    let tag = tagName;
    let userId = Meteor.userId();
    if(!Tags.findOne({"name" : tag}) && Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]))
    {
      if(course == true)
    Tags.insert({"name" : tag, "course" : true});
    else      Tags.insert({"name" : tag, "course" : false});

    }

  },

  deleteTag(id)
  {
    let id_ = id;

    let tag = Tags.findOne({_id : id_});
   let userId  = Meteor.userId();


    if (!tag)
      throw new Meteor.Error(404, 'The tag you are trying to delete is not found');

    if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]))
    {
      Tags.remove(id_);
    }
    else {
      throw new Meteor.Error(401, 'You are not authorized to delete this tag !');
    }
  },


})
