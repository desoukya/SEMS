Template.discussions.onRendered(function() {
  $('.ui.form').form({
    fields: {

      title: {
        identifier: 'title',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your question'
        }]
      },

    }
  });

  $('.ui.dropdown')
    .dropdown({
      allowAdditions: true
    });
});

Template.discussions.events({
  "submit .new-question": function(event) {
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

    // Insert a task into the collection
    Questions.insert(question);

    // Clear form
    event.target.title.value = "";
    event.target.description.value = "";
    // clear selected values
    $('.ui.dropdown').dropdown('clear');
  }
});
Template.discussions.helpers({
  questions() {
    return Questions.find({}, {
      'createdAt': -1
    });
  },
  allTags() {
    var everything = Questions.find().fetch();
    var allQuestionsTags = _.pluck(everything, "tags");
    var allQuestionsTagsConcatinatedArray = [].concat.apply([], allQuestionsTags);
    return _.uniq(allQuestionsTagsConcatinatedArray);
  },
});