Template.tagsEdit.helpers({

viewTags: function (){
  return Tags.find({});
}

});
Template.tagsEdit.events({
  'submit .form-register' : function(e){
    e.preventDefault();

    var tagName = e.target.tagName.value;
  if(!Tags.findOne({"name" : tagName}))
    Tags.insert({"name" : tagName})
  else {
    sAlert.error("This tag already exists");
        }
        e.target.tagName.value = '';
  },

  'click #delete' : function()
  {

    Tags.remove(this._id);
  }
})
