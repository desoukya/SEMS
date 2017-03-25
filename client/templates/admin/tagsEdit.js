Template.tagsEdit.helpers({

    viewTags: function() {
        return Tags.find({});
    }
});
Template.tagsEdit.events({
    'submit .form-register': function(e) {
        e.preventDefault();

        var tagName = e.target.tagName.value;
        var type = $("#type").val();
        console.log(tagName);
        console.log(type);
        let Tag = {
          name: tagName,
          tagType: type
        }
        console.log(Tag)
        Meteor.call('createTag', Tag, function(err) {
            if (err)
                sAlert.error(err.reason);

        });
        e.target.tagName.value = '';
        $('.ui.dropdown').dropdown('clear');

    },

    'click #delete-icon': function() {

        Meteor.call('deleteTag', this._id, function(err) {
            if (err)
                sAlert.error(err.reason);
        })

    }
})
