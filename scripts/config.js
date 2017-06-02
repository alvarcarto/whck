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

module.exports = {
  API_HOST: process.env.API_HOST,
  API_HTTP_URL: `http://${process.env.API_HOST}`,
  API_WS_URL: `ws://${process.env.API_HOST}`,
};
