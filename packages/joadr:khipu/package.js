Package.describe({
  name: 'joadr:khipu',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use([
    'meteor-platform',
    'http',
    'mrt:crypto-hmac-sha256-base64@0.0.1',
    'jquery',
    'iron:router'
  ]);
  api.versionsFrom('1.0');
  api.addFiles([
                'lib/views/pagos.html',
                'lib/views/pagos.js',
                'lib/views/khipuCancel.html',
                'lib/views/khipuButton.html',
                'lib/views/khipuButton.js',
                'lib/js/atmosphere-2.1.2.min.js',
                'lib/js/khipu-1.1.js'
              ], 'client');

  api.addFiles(['joadr:khipu.js',
                'lib/init.js',
                'lib/routes.js']);

  api.addFiles(['lib/methods.js', 'lib/sendNotificationUrl.js'], 'server');

  api.export('khipu');

  /*api.addFiles('lib/tester.js');*/
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('joadr:khipu');
  api.addFiles('joadr:khipu-tests.js');
});
