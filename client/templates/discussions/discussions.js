Template.discussions.onRendered(function() {
  $('.ui.form').form({
    inline:true,
    fields: {

      title: {
        identifier: 'title',
        rules: [{
          type: 'empty',
          prompt: 'Questions should have a title'
        }, {
          type: 'length[4]',
          prompt: 'Title should be longer than 4 characters'
        }]
      },

      description: {
        identifier: 'description',
        rules: [{
          type: 'empty',
          prompt: 'You should have some description about your question'
        }, {
          type: 'length[25]',
          prompt: 'You should provide a better discription of your question. min length is 25 characters '
        }]
      },

      tags: {
        identifier: 'tags',
        rules: [{
          type: 'minCount[1]',
          prompt: 'You need at least one tag for your question'
        }]
      }
    }
  });
  $('.ui.dropdown').dropdown({ allowAdditions: true });
  //clear current question search on rendered
  QuestionsIndex.getComponentMethods().search('');

});

Template.discussions.events({
  'submit .new-question': function(event) {
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
      upvotes: [],
      downvotes: [],
      createdAt: Date.now() // current time
    }

    // Insert a task into the collection
    Questions.insert(question);

    // Clear form
    event.target.title.value = "";
    event.target.description.value = "";

    // clear selected values
    $('.ui.dropdown').dropdown('clear');

    animateForm();
  },

  'click #toggle-question-form-button': function(event, template) {
    animateForm();
  },
  'click #help-icon': function(event, template) {

    $('#question-help-modal').modal('show');
  }

});

Template.discussions.helpers({
  questions() {
    return Questions.find({});
  },

});

Template.questionForm.helpers({
  allTags() {
    var everything = Questions.find().fetch();
    var allQuestionsTags = _.pluck(everything, "tags");
    var allQuestionsTagsConcatinatedArray = [].concat.apply([], allQuestionsTags);
    return _.uniq(allQuestionsTagsConcatinatedArray);
  },

});


function animateForm() {
  // Animating Question form on toggle
  $('#add-question-form').transition({
    duration: 500,
    animation: 'slide down'
  });
}

Template.questionsSearchBox.helpers({
  questionsIndex() {
    return QuestionsIndex;
  },
  questionsSuggestionsIndex() {
    return QuestionsSuggestionsIndex;
  },
  questionBoxAttributes() {
    var attributes = { 'placeholder': 'Search in questions', 'id': 'search-box' , 'class': 'prompt'};
    return attributes;
  }
});


Template.questionsSearchBox.events({
  'keyup #search-box': _.throttle(function(e) {
    var query = $(e.target).val().trim();
    if (query) {
      $('.ui.question.search').search('show results');
    } else {
      $('.ui.question.search').search('hide results');
    }
    //if pressed enter
    if(e.which == 13){
      QuestionsIndex.getComponentMethods().search(query);
    }
  }, 200)
});
