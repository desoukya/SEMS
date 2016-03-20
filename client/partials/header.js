// ES6
Template.header.onRendered(function() {

  Meteor.call('getNodeEnv', function(err, env) {
    if (env !== 'production' && Meteor.settings.environment !== 'production') {
      $('.ui.large.top.hidden.menu').addClass('teal inverted');
    }
  });

});
