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
    'http',
    'mrt:crypto-hmac-sha256-base64@0.0.1',
    'jquery',
    'iron:router'
  ]);
  api.versionsFrom('1.0');
  api.addFiles('joadr:khipu.js');
  api.addFiles('lib/init.js');
  api.addFiles('lib/methods.js');
  api.addFiles('lib/routes.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('joadr:khipu');
  api.addFiles('joadr:khipu-tests.js');
});
