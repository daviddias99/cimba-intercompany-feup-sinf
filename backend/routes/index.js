const router = require('express').Router();
const { makeRequest } = require('../jasmin/makeRequest');

const { makeRequest } = require('../jasmin/makeRequest');

router.get('/', async (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.use('/', require('./auth'));

router.get('/testMakeRequest', async (req, res) => {
  // TODO: test
  const result = await makeRequest('purchases/orders', 'get', {}, {}, 3);
  res.send(result);
});

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;
