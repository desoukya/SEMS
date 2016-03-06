Template.discussions.events({
  "submit .new-question": function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    var question = {
      title: text,
      askerId: Meteor.userId(),
      createdAt: new Date() // current time
    }
    console.log(question);

    // Insert a task into the collection
    Questions.insert(question);

    // Clear form
    event.target.text.value = "";
  }
});
Template.discussions.helpers({
  questions() {
    return Questions.find({},{'createdAt':-1});
  },
});
