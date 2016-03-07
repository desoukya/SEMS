Template.discussions.onRendered(function() {
  $('.ui.dropdown')
    .dropdown({
      allowAdditions: true
    });
});

Template.discussions.events({
  "submit .new-question": function(event) {
    console.log('submitted');
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var title = event.target.title.value;
    var tags = $('#tags').val().split(',').filter(function(tag) {
      return tag.length > 0;
    });
    var description = event.target.description.value;

    var question = {
      title: title,
      description: description,
      tags: tags,
      ownerId: Meteor.userId(),
      answers: [],
      createdAt: new Date() // current time
    }
    console.log(question);

    // Insert a task into the collection
    Questions.insert(question);

    // Clear form
    event.target.title.value = "";
    event.target.description.value = "";
  }
});
Template.discussions.helpers({
  questions() {
    return Questions.find({}, {
      'createdAt': -1
    });
  },
});