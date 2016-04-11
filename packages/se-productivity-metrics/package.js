Package.describe({
    name: 'omarkamal95:se-productivity-metrics',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'A package that compiles metrics to help measure the productivity of software engineering teams',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use(['http','nooitaf:colors','underscore'],'server');
    api.addFiles('se-productivity-metrics.js',['server']);
    api.export(['Metrics'], 'server');

});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('omarkamal95:se-productivity-metrics');
    api.addFiles('se-productivity-metrics-tests.js');
});
