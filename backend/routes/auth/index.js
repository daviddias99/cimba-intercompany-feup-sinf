const router = require('express').Router();
const middlewares = require('../../middlewares');
const schemas = require('../../schemas');

router.use('/login',
  middlewares.bodyValidator(schemas.login),
  require('./login'));

router.use('/logout',
  middlewares.authenticate,
  require('./logout'));

module.exports = router;
