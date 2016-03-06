Router.route('/discussions', {
  name: 'discussions',

  waitOn() {
    return Meteor.subscribe('questions');
  },

  action() {
    this.render('discussions');
  },

});

Router.route('/discussions/:_id', {
  name: 'question.page',

  waitOn() {
    return Meteor.subscribe('questions');
  },

  action() {
    var question = Questions.findOne({ _id: this.params._id });
    if (!question) {
      this.render('home');
    } else {
      this.render('questionPage');
    }
  },

  data() {
    return Questions.findOne({ _id: this.params._id });
  },

});
