/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    'ember-dxfeed': {
      url: process.env.DXFEED_URL
    }
  };
};
