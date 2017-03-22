Template.tagsEdit.created =  function()
{
  //  TODO
  this.type = new ReactiveVar("Topic");
}

Template.tagsEdit.helpers({

viewTags: function (){
  return Tags.find({});
}
});
Template.tagsEdit.events({
  'submit .form-register' : function(e){
    e.preventDefault();

    var tagName = e.target.tagName.value;
    var type = $("#type").val();
    var lectures = false;
    var project = false;
    var labs = false;
    var topic = false;
    switch(type)
    {
      case "lectures": lectures = true; break;
      case "project": project = true; break;
      case "labs": labs = true; break;
      case "topic": topic = true; break;
    }
  
  Meteor.call('createTag', tagName, lectures,project,labs,topic, function(err)
{
  if(err)
  sAlert.error(err.reason);

});
e.target.tagName.value = '';
$('.ui.dropdown').dropdown('clear');

  },

  'click #delete-icon' : function()
  {

    Meteor.call('deleteTag',this._id, function(err){
      if(err)
      sAlert.error(err.reason);
    } )

  }
})
