const router = require('express').Router();

router.get('/', require('../controllers/userController').all_users);
router.post('/', require('../controllers/userController').new_user);

module.exports = router;
