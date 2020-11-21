const router = require('express').Router();
const regexNum = require('../helper/regexNum');

router.get('/', require('../controllers/companyController').all_companies);
router.post('/', require('../controllers/companyController').new_company);
router.get(`/:id(${regexNum})`, require('../controllers/companyController').company_by_id);
router.get(`/:id(${regexNum})/companyMaps`, require('../controllers/companyMapsController').all_company_maps);
router.post(`/:id(${regexNum})/companyMaps`, require('../controllers/companyMapsController').new_company_map);

module.exports = router;
