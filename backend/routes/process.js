const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const regexNum = require('../helper/regexNum');
const processController = require('../controllers/processController');

router.get(`/:id(${regexNum})/order`,
  authenticate,
  processController.getOrder);

router.get(`/:id(${regexNum})/transportation`,
  authenticate,
  processController.getTransportation);

router.get(`/:id(${regexNum})/invoice`,
  authenticate,
  processController.getInvoice);

router.get(`/:id(${regexNum})/financial`,
  authenticate,
  processController.getFinancial);

module.exports = router;
