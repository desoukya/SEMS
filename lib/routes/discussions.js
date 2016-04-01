Router.route('/discussions', {
  name: 'discussions',

  waitOn() {
    return [Meteor.subscribe('users'), Meteor.subscribe('images')];
  },

  action() {
    this.render('discussions');
  },

});

Router.route('/discussions/:slug', {
  name: 'question.page',

  waitOn() {
    return [Meteor.subscribe('questionData', this.params.slug), Meteor.subscribe('users')];
  },

  action() {
    var question = Questions.findOne({ slug: this.params.slug });
    if (!question) {
      this.render('discussions');
    } else {
      this.render('questionPage');
    }
  },

  data() {
    return Questions.findOne({ slug: this.params.slug });
  },

});
