const _ = require('lodash');

// Example of build time configuration
// envify is a Browserify transform which replaces all process.env.X references
// with build time environment variables.
// You must e.g. do
//    API_HOST=x npm run build
//
// to change this variable.
if (_.isEmpty(process.env.API_HOST)) {
  let message = 'API_HOST is not defined. You must define API_HOST environment'
  message += ' variable when building the frontend.'

  throw new Error(message);
}

const config = {
  API_HOST: process.env.API_HOST,
  SECURE: process.env.SECURE === 'true',
};

if (config.SECURE) {
  config.API_HTTP_URL = `https://${process.env.API_HOST}`;
  config.API_WS_URL = `wss://${process.env.API_HOST}`;
} else {
  config.API_HTTP_URL = `http://${process.env.API_HOST}`;
  config.API_WS_URL = `ws://${process.env.API_HOST}`;
}

module.exports = config;
