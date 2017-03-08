Template.question.onRendered(function() {
  this.$('.question-owner-popup-activator').popup({
    popup: this.$('.special.popup'),
    hoverable: true,
    delay: {
      show: 300,
    }
  });
});
