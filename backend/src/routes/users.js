const router = require('express').Router();
const regexNum = require('../helper/regexNum');

router.get('/', require('../controllers/userController').allUsers);
router.post('/', require('../controllers/userController').newUser);
router.get(`/:id(${regexNum})`, require('../controllers/userController').userById);
router.get(`/:id(${regexNum})/company`, require('../controllers/userController').userCompany);

module.exports = router;
