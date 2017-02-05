Meteor.startup(function() {
  if (Companies.find().count() === 0) {
    Companies.insert({ '_id': '1', 'image': 'angular.png', 'name': 'angular.png' });
    Companies.insert({ '_id': '2', 'image': 'css3.png', 'name': 'css3.png' });
    Companies.insert({ '_id': '3', 'image': 'html5.png', 'name': 'html5.png' });
    Companies.insert({ '_id': '4', 'image': 'mongodb.png', 'name': 'mongodb.png' });
    Companies.insert({ '_id': '5', 'image': 'webpack.png', 'name': 'webpack.png' });
    Companies.insert({ '_id': '6', 'image': 'backbone.png', 'name': 'backbone.png' });
    Companies.insert({ '_id': '7', 'image': 'ember.png', 'name': 'ember.png' });
    Companies.insert({ '_id': '8', 'image': 'jasmine.png', 'name': 'jasmine.png' });
    Companies.insert({ '_id': '9', 'image': 'polymer.png', 'name': 'polymer.png' });
    Companies.insert({ '_id': '10', 'image': 'yeoman.png', 'name': 'yeoman.png' });
    Companies.insert({ '_id': '11', 'image': 'bootstrap.png', 'name': 'bootstrap.png' });
    Companies.insert({ '_id': '12', 'image': 'grunt.png', 'name': 'grunt.png' });
    Companies.insert({ '_id': '13', 'image': 'javascript.png', 'name': 'javascript.png' });
    Companies.insert({ '_id': '14', 'image': 'react.png', 'name': 'react.png' });
    Companies.insert({ '_id': '15', 'image': 'zurb.png', 'name': 'zurb.png' });
    Companies.insert({ '_id': '16', 'image': 'bower.png', 'name': 'bower.png' });
    Companies.insert({ '_id': '17', 'image': 'gulp.png', 'name': 'gulp.png' });
    Companies.insert({ '_id': '18', 'image': 'marionette.png', 'name': 'marionette.png' });
    Companies.insert({ '_id': '19', 'image': 'sass.png', 'name': 'sass.png' });
    Companies.insert({ '_id': '20', 'image': 'coffeescript.png', 'name': 'coffeescript.png' });
    Companies.insert({ '_id': '21', 'image': 'handlebars.png', 'name': 'handlebars.png' });
    Companies.insert({ '_id': '22', 'image': 'materialize.png', 'name': 'materialize.png' });
    Companies.insert({ '_id': '23', 'image': 'stylus.png', 'name': 'stylus.png' });
  }

});
