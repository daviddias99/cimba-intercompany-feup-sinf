const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;
