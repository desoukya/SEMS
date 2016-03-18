// ES6
Template.header.onRendered(function() {

  Meteor.call('getNodeEnv', function(err, env) {
    if (env === 'development') {
      $('.ui.large.top.hidden.menu').addClass('teal inverted');
    }

  });


})

