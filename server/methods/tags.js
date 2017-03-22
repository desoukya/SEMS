Meteor.methods({

  createTag(tagName, lectures,project,labs,topic)
  {
    let tag = tagName;
    let userId = Meteor.userId();
    if(tag == ""){
      throw new Meteor.Error(400,"The tag you're creating doesn't have a name");
    }
    if(!Tags.findOne({"name" : tag}) && Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA]))
    {
      if(lectures == true){
    Tags.insert({"name" : tag, "lectures" : true});
  }
    else {
      if(project == true)
      {
        Tags.insert({"name" : tag, "project" : true});
      }
      else {
        if(labs == true)
        {
          Tags.insert({"name" : tag, "labs" : true});
        }
        else {
          if(topic == true)
          {
            Tags.insert({"name" : tag, "topic" : true});
          }
          else {
            throw new Meteor.Error(400,"You didn't choose a tag type");

          }
        }
      }
    }

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
