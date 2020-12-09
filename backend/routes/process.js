const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const regexNum = require('../helper/regexNum');
const processController = require('../controllers/processController');
const { getProcess } = require('../database/methods/orderMethods');

async function processMiddleware(req, res, next) {
  const process = await getProcess(req.params.id);

  if (!process) {
    res.status(404).json({ status: 404 });
    return;
  }

  req.process = process;
  next();
}

router.use(authenticate);
router.use(`/:id(${regexNum})`, processMiddleware);

router.get(`/:id(${regexNum})/order`, processController.getOrder);

router.get(`/:id(${regexNum})/transportation`, processController.getTransportation);

router.get(`/:id(${regexNum})/invoice`, processController.getInvoice);

router.get(`/:id(${regexNum})/financial`, processController.getFinancial);

module.exports = router;
