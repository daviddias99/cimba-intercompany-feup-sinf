const { makeRequest } = require('../jasmin/makeRequest');

const router = require('express').Router();

router.get('/', async (req, res) => {
 res.send('Welcome to Cimba Intercompany.');
});

router.get('/testMakeRequest', async (req, res) => {
  // TODO: test
  const result = await makeRequest('purchases/orders', 'get', {}, {}, 3);
  //const result = await makeRequest('financialCore/accounts', 'get', {page: 1, pageSize: 20}, {}, 3);
  res.send(result);

});

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;
