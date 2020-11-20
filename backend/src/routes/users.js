const router = require('express').Router();

router.get('/', require('../controllers/userController').all_users);

module.exports = router;
