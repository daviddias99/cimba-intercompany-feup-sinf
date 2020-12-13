const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.use('/', require('./auth'));

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));
router.use('/process', require('./process'));
router.use('/logs', require('./logs'));

module.exports = router;
