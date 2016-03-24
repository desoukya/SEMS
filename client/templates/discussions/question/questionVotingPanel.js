Template.questionVotingPanel.helpers({
  activeUp() {
    let question = Questions.findOne({ _id: this._id });

    if (!question)
      return
    
    let upvoters = question.upvotes
      .map(function(x) {
        return x.ownerId;
      });

    return _.contains(upvoters, Meteor.userId()) ? 'green' : '';

  },

  activeDown() {
    let question = Questions.findOne({ _id: this._id });

    if (!question)
      return

    let downvoters = question.downvotes
      .map(function(x) {
        return x.ownerId;
      });

    return _.contains(downvoters, Meteor.userId()) ? 'red' : '';

  },

});

Template.questionVotingPanel.events({
  'click #upvote': function(event) {
    Meteor.call('upvoteQuestion', this._id, function(err) {
      if (err)
        sAlert.error(err.reason);
    });

  },

  'click #downvote': function(event) {
    Meteor.call('downvoteQuestion', this._id, function(err) {
      if (err)
        sAlert.error(err.reason);
    });
  }
});
