/* General */
const notFound = require('./notFound.js');
const timeout = require('./timeout.js');
const error = require('./error.js');
const bodyValidator = require('./bodyValidator.js');
const authenticate = require('./authenticate.js');
const associateCompany = require('./associateCompany.js');

module.exports = {
  authenticate,
  bodyValidator,
  notFound,
  timeout,
  error,
  associateCompany,
};
