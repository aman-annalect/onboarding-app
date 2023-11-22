'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
  });
  app.import('node_modules/jquery/dist/jquery.min.js');
  app.import('node_modules/datatables.net/js/jquery.dataTables.js');
  app.import('node_modules/datatables.net/js/jquery.dataTables.js');
  app.import('node_modules/datatables.net-dt/css/jquery.dataTables.css');

  return app.toTree();
};
