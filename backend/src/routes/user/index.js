const router = require('express').Router();

router.get('/', require('./retrieve_all_users'));

module.exports = router;
