Template.question.onRendered(function() {
  $('.question-owner-popup-activator').popup({
    popup: '.special.popup',
    hoverable: true,
    delay: {
      show: 300,
    }
  });

});
