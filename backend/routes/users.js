const router = require('express').Router();
const regexNum = require('../helper/regexNum');
const validateBody = require('../middlewares/bodyValidator');
const authenticate = require('../middlewares/authenticate');
const schemas = require('../schemas');

router.get('/', require('../controllers/userController').allUsers);
router.post('/',
  validateBody(schemas.userCreation),
  require('../controllers/userController').newUser);
router.get(`/:id(${regexNum})`, require('../controllers/userController').userById);
router.get(`/:id(${regexNum})/company`, require('../controllers/userController').userCompany);
router.post(`/:id(${regexNum})/company`,
  authenticate,
  validateBody(schemas.companyCreation),
  require('../controllers/userController').updateUserCompany);

module.exports = router;
