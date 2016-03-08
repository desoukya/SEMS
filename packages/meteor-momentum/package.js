Package.describe({
  summary: "Reactive animations",
  version: "0.7.3",
  name: "sems:momentum",
  git: "https://github.com/percolatestudio/meteor-momentum.git"
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.2');
  api.use(['templating', 'check', 'jquery', 'underscore', 'velocityjs:velocityjs@1.2.1'
      ], 'client');

  api.addFiles([
    'momentum.html',
    'momentum.js',
    'plugins/none.js',
    'plugins/css.js',
    'plugins/velocity.js',
    'plugins/growl.js',
    'plugins/side-to-side.js',
    'plugins/slide-height.js',
    'plugins/fade.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
