/* General */
const notFound = require('./notFound.js');
const timeout = require('./timeout.js');
const error = require('./error.js');
const bodyValidator = require('./bodyValidator.js');
const authenticate = require('./authenticate.js');

module.exports = {
  authenticate,
  bodyValidator,
  notFound,
  timeout,
  error,
};
