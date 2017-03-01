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
     var course = $('#course').prop('checked');
  
  Meteor.call('createTag', tagName, course, function(err)
{
  if(err)
  sAlert.error("This tag already exists");

});
e.target.tagName.value = '';
  },

  'click #delete-icon' : function()
  {

    Meteor.call('deleteTag',this._id, function(err){
      if(err)
      sAlert.error(err.reason);
    } )

  },

  'change #course': function(event) {
    console.log(event.currentTarget.checked);
    if (event.currentTarget.checked)
    $('#label').text("Course");
  else

  $('#label').text("Topic");

  },
})
