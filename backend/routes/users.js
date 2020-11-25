const router = require('express').Router();
const regexNum = require('../helper/regexNum');
const validateBody = require('../middlewares/bodyValidator');
const schemas = require('../schemas');

router.get('/', require('../controllers/userController').allUsers);
router.post('/',
  validateBody(schemas.userCreation),
  require('../controllers/userController').newUser);
router.get(`/:id(${regexNum})`, require('../controllers/userController').userById);
router.get(`/:id(${regexNum})/company`, require('../controllers/userController').userCompany);

module.exports = router;
