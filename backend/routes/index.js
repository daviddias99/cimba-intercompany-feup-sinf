const router = require('express').Router();
const { createSalesOrder } = require('../jasmin/orders');

router.get('/', async (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.get('/test', async (req, res) => {
  const response = await createSalesOrder(1, '0002', 'Transp', [{ salesItem: 'PORTES' }]);
  res.send(response);
});

router.use('/', require('./auth'));

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;
