const router = require('express').Router();
const regexNum = require('../helper/regexNum');

router.get('/', require('../controllers/companyController').allCompanies);
router.post('/', require('../controllers/companyController').newCompany);
router.get(`/:id(${regexNum})`, require('../controllers/companyController').companyById);
router.get(`/:id(${regexNum})/companyMaps`, require('../controllers/companyMapsController').allCompanyMaps);
router.post(`/:id(${regexNum})/companyMaps`, require('../controllers/companyMapsController').newCompanyMap);
router.get(`/:id(${regexNum})/itemMaps`, require('../controllers/itemMapsController').allItemMaps);
router.post(`/:id(${regexNum})/itemMaps`, require('../controllers/itemMapsController').newItemMap);

module.exports = router;
