Router.route('/discussions', {
  name: 'discussions',

  waitOn() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('users')];
  },

  action() {
    this.render('discussions');
  },

});

Router.route('/discussions/:_id', {
  name: 'question.page',

  waitOn() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('answers'), Meteor.subscribe('users')];
  },

  action() {
    var question = Questions.findOne({ _id: this.params._id });
    if (!question) {
      this.render('discussions');
    } else {
      this.render('questionPage');
    }
  },

  data() {
    return Questions.findOne({ _id: this.params._id });
  },

});