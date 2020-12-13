const router = require('express').Router();
const { authenticate, associateCompany } = require('../middlewares');
const logsController = require('../controllers/logsController');

router.use(authenticate);
router.use(associateCompany);

router.get('/', logsController.getLogs);

module.exports = router;
