const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const regexNum = require('../helper/regexNum');
const processController = require('../controllers/processController');

router.use(authenticate);

router.get(`/:id(${regexNum})/order`, processController.getOrder);

router.get(`/:id(${regexNum})/transportation`, processController.getTransportation);

router.get(`/:id(${regexNum})/invoice`, processController.getInvoice);

router.get(`/:id(${regexNum})/financial`, processController.getFinancial);

module.exports = router;
