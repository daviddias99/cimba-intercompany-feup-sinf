const router = require('express').Router();
const regexNum = require('../helper/regexNum');
const validateBody = require('../middlewares/bodyValidator');
const schemas = require('../schemas');

router.get('/', require('../controllers/companyController').allCompanies);
router.post('/',
  validateBody(schemas.companyCreation),
  require('../controllers/companyController').newCompany);

router.get(`/:id(${regexNum})`, require('../controllers/companyController').companyById);

router.get(`/:id(${regexNum})/companyMaps`, require('../controllers/companyMapsController').allCompanyMaps);
router.post(`/:id(${regexNum})/companyMaps`,
  validateBody(schemas.companyMap),
  require('../controllers/companyMapsController').newCompanyMap);
router.delete(`/:id(${regexNum})/companyMaps/:jasmin_id`,
  require('../controllers/companyMapsController').deleteCompanyMap);

router.get(`/:id(${regexNum})/itemMaps`, require('../controllers/itemMapsController').allItemMaps);
router.post(`/:id(${regexNum})/itemMaps`,
  validateBody(schemas.itemMap),
  require('../controllers/itemMapsController').newItemMap);
router.delete(`/:id(${regexNum})/itemMaps/:jasmin_id`,
  require('../controllers/itemMapsController').deleteItemMap);

module.exports = router;
