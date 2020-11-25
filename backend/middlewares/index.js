/* General */
const notFound = require('./notFound.js');
const timeout = require('./timeout.js');
const error = require('./error.js');
const bodyValidator = require('./bodyValidator.js');

module.exports = {
  bodyValidator,
  notFound,
  timeout,
  error,
};
