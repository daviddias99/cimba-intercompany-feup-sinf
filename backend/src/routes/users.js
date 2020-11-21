const router = require('express').Router();
const regexNum = require('../helper/regexNum');

router.get('/', require('../controllers/userController').all_users);
router.post('/', require('../controllers/userController').new_user);
router.get(`/:id(${regexNum})`, require('../controllers/userController').user_by_id);
router.get(`/:id(${regexNum})/company`, require('../controllers/userController').user_company);

module.exports = router;
