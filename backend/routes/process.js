const router = require('express').Router();
const regexNum = require('../helper/regexNum');
const processController = require('../controllers/processController');
const { getProcess } = require('../database/methods/orderMethods');
const { associateCompany, authenticate } = require('../middlewares');

async function processMiddleware(req, res, next) {
  const process = await getProcess(req.params.id);

  if (!process) {
    res.status(404).json({ status: 404 });
    return;
  }

  if (process.ic_id !== req.company.id) {
    res.status(403).json({ status: 403 });
    return;
  }

  req.process = process;
  next();
}

router.use(authenticate);
router.use(associateCompany);
router.use(`/:id(${regexNum})`, processMiddleware);

router.get(`/:id(${regexNum})/order`, processController.getOrder);

router.get(`/:id(${regexNum})/transportation`, processController.getTransportation);

router.get(`/:id(${regexNum})/invoice`, processController.getInvoice);

router.get(`/:id(${regexNum})/financial`, processController.getFinancial);

router.get(`/:id(${regexNum})`, processController.getProcess);

router.get('/', processController.getAllProcesses);

module.exports = router;
