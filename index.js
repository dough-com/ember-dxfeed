/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-dxfeed',

  included: function (app) {
    this._super.included(app);

    app.import('vendor/cometd.js');
    app.import('vendor/dxfeed.cometd.js');
    app.import('vendor/jquery.cometd.js');
  }
};
