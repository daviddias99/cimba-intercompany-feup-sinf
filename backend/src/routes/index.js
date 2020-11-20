const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to Cimba Intercompany.');
});

router.use('/users', require('./user'));

module.exports = router;
