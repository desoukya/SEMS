Template.questionVotingPanel.helpers({
  activeUp() {
    let upvoters = this.upvotes
      .map(function(x) {
        return x.ownerId;
      });

    return _.contains(upvoters, Meteor.userId()) ? 'green' : '';

  },

  activeDown() {
    let downvoters = this.downvotes
      .map(function(x) {
        return x.ownerId;
      });

    return _.contains(downvoters, Meteor.userId()) ? 'red' : '';

  },

});

Template.questionVotingPanel.events({
  'click #upvote': function(event) {
    let id = this.__originalId || this._id;

    Meteor.call('upvoteQuestion', id, function(err) {
      if (err)
        sAlert.error(err.reason);
    });

  },

  'click #downvote': function(event) {
    let id = this.__originalId || this._id;

    Meteor.call('downvoteQuestion', id, function(err) {
      if (err)
        sAlert.error(err.reason);
    });
  }
});
